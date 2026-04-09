import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Userform = () => {
    const [users, setUsers] = useState([]);
    const [Subject, setSubject] = useState('');
    const [Exam_date, setExam_date] = useState('');
    useEffect(() => {
        fetchUsers();
    }, []);
    const fetchUsers = async()=> {
    const response = await axios.get('http://localhost:5001/users');
    setUsers(response.data);
};
const handleSubmit = async(e)=> {
    e.preventDefault();
    await axios.post('http://localhost:5001/users', { Subject, Exam_date });
    fetchUsers();
    setSubject('');
    setExam_date('');
};
return (
    <div>
        <form onSubmit={handleSubmit}>
            <table align="center" width="500">
                <tr>
                    <td>
                        <input type='text' placeholder='Submit Name' value={Subject} onChange={(e) => setSubject(e.target.value)}
                            required /></td>
                    <td>
                        <input type='date' placeholder='Submit Name' value={Exam_date} onChange={(e) => setExam_date(e.target.value)}
                            required /></td>
                    <td><button type='submit'>Add More</button></td>
                </tr>
            </table>
        </form>
  <table border='1' align='center' width='50%'>
    <tbody>
        {users.map(user=>(
            <tr key={user.id}>
                <td>{user.Subject}</td>
                <td>{new Date(user.Exam_date).
                toLocaleDateString()}</td>
            </tr>
        ))}
    </tbody>
  </table>
    </div>
);
};
export default Userform;