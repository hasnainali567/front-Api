const apiUrl = 'http://localhost:3000/api/students/'

const fetchStudents = async () => {
    const res = await fetch(apiUrl);
    const { data } = await res.json();


    console.log(data);
    
}


fetchStudents()