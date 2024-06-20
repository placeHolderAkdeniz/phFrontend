import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCard, { Comment } from '../comment/comment';
import { useParams } from 'react-router-dom';
import { Box, TextField, Button, CircularProgress, Typography, Rating } from '@mui/material';
import styles from './hotel-comment.module.scss';

const HotelComment: React.FC = () => {
  const { _id } = useParams<{ _id: string }>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [transportationStar, setTransportationStar] = useState<number | null>(null);
  const [safetyStar, setSafetyStar] = useState<number | null>(null);
  const [hygieneStar, setHygieneStar] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasToken, setHasToken] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setHasToken(!!token);

    const fetchComments = async () => {
      console.log(_id+"dsfsdfs");
      try {
        const response = await axios.get(`https://phbackend-m3r9.onrender.com/hotels/comments?hotelId=${_id}`);
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(response.data);
        
        setComments(response.data.comments);
      } catch (error) {
        console.error('Error fetching comments:', error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [_id]);

  const handleCommentSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You need to log in to post a comment.');
      return;
    }

    if (transportationStar === null || safetyStar === null || hygieneStar === null) {
      setError('Please rate all categories.');
      return;
    }

    try {
      
      
      const response = await axios.post(`https://phbackend-m3r9.onrender.com/comments?hotelId=${_id}`, {
        value: newComment,
        transportation_star: transportationStar,
        safety_star: safetyStar,
        hygiene_star: hygieneStar,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response.status);
      
      if (response.status === 200) {
        setComments([...comments, response.data]);
        setNewComment('');
        setTransportationStar(null);
        setSafetyStar(null);
        setHygieneStar(null);
      } else {
        setError('Failed to post comment.');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box className={styles.commentSection}>
      <Box className={styles.commentList}>
        {comments.map((comment) => (
          <CommentCard key={comment.hotel._id} comment={comment} />
        ))}
      </Box>
      {hasToken && (
        <Box className={styles.commentForm}>
          <TextField
            fullWidth
            variant="outlined"
            label="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Box className={styles.rating}>
            <Typography component="legend">Transportation</Typography>
            <Rating
              name="transportation-rating"
              value={transportationStar}
              onChange={(event, newValue) => {
                setTransportationStar(newValue);
              }}
            />
          </Box>
          <Box className={styles.rating}>
            <Typography component="legend">Safety</Typography>
            <Rating
              name="safety-rating"
              value={safetyStar}
              onChange={(event, newValue) => {
                setSafetyStar(newValue);
              }}
            />
          </Box>
          <Box className={styles.rating}>
            <Typography component="legend">Hygiene</Typography>
            <Rating
              name="hygiene-rating"
              value={hygieneStar}
              onChange={(event, newValue) => {
                setHygieneStar(newValue);
              }}
            />
          </Box>
          <Button variant="contained" color="primary" onClick={handleCommentSubmit}>
            Submit
          </Button>
        </Box>
      )}
      {!hasToken && <Typography>You need to log in to post a comment.</Typography>}
    </Box>
  );
};

export default HotelComment;
