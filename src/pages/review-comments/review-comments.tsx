import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';
import STopBar from '@/components/signed-in-compenents/s-top-bar/s-top-bar';
import { Footer } from '@/components/footer/footer';
import styles from './review-comments.module.scss';
import CommentCard from '@/components/comment/comment';
import {Comment} from '../../components/comment/comment';


const UserComments = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [comments, setUserComment] = useState<Comment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://phbackend-m3r9.onrender.com/users/comments', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setUserComment(data.comments);
          
        console.log("hotelname",data);
        } else {
          setError('Failed to fetch comments.');
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
        setError('An error occurred while fetching comments.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchComments();
    }
  }, [user]);

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(comments.length / commentsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <STopBar />
      <div className={styles.content}>
        <h2>User Comments</h2>
        {currentComments.map((comment, index) => (
          <CommentCard key={index} comment={comment} />
        ))}
        <div className={styles.pagination}>
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>{currentPage}</span>
          <button onClick={handleNextPage} disabled={currentPage === Math.ceil(comments.length / commentsPerPage)}>
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserComments;