import { useEffect, useState } from 'react';
import { table } from 'table';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

const TableComponent = () => {
  const [tableData, setTableData] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();

        const users: User[] = data.users;

        // Format the data for the `table` library
        const tableDataArray = [
          ['ID', 'Username', 'Email', 'First Name', 'Last Name', 'Gender'],
          ...users.map((user) => [
            user.id.toString(),
            user.username,
            user.email,
            user.firstName,
            user.lastName,
            user.gender,
          ]),
        ];

        const output = table(tableDataArray);
        setTableData(output);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Users Table</h1>
      <pre>{tableData}</pre> {/* Menampilkan tabel dalam format teks */}
    </div>
  );
};

export default TableComponent;
