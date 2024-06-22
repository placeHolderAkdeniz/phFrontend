import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useFetch from "@/hooks/useFetch";

interface CommentRow {
  _id: string;
  value: string;
  hygiene_star: number;
  safety_star: number;
  transportation_star: number;
  likes: number;
  user: {
    first_name: string;
    last_name: string;
  };
  createdAt: string;
}

const List: React.FC = () => {
  const { data: myHotelData } = useFetch("https://phbackend-9rp2.onrender.com/users/my-hotel");
  const hotelId = myHotelData && myHotelData.length > 0 ? myHotelData[0]._id : null;
  const { data: commentsData } = useFetch(hotelId ? `https://phbackend-9rp2.onrender.com/hotels/comments?hotelId=${hotelId}` : null);

  const rows: CommentRow[] = commentsData && commentsData.comments ? commentsData.comments.slice(0, 5) : [];

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableHead">User</TableCell>
            <TableCell className="tableHead">Comment</TableCell>
            <TableCell className="tableHead">Hygiene</TableCell>
            <TableCell className="tableHead">Safety</TableCell>
            <TableCell className="tableHead">Transportation</TableCell>
            <TableCell className="tableHead">Likes</TableCell>
            <TableCell className="tableHead">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: CommentRow) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell">{`${row.user.first_name} ${row.user.last_name}`}</TableCell>
              <TableCell className="tableCell">{row.value}</TableCell>
              <TableCell className="tableCell">{row.hygiene_star}</TableCell>
              <TableCell className="tableCell">{row.safety_star}</TableCell>
              <TableCell className="tableCell">{row.transportation_star}</TableCell>
              <TableCell className="tableCell">{row.likes}</TableCell>
              <TableCell className="tableCell">{new Date(row.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
