const apiUrl = 'http://localhost:3000/api/students'
const tBody = document.getElementById('studentTableBody');
const viewModal = document.getElementById('viewStudentModal');
const editModal = document.getElementById('editStudentModal');
const addModal = document.getElementById('addStudentModal');
const input = document.getElementById('searchInput');
const addForm = document.getElementById('addStudentForm');
const paginate = document.querySelector('.pagination');
let currentSearch = '';

const fetchData = async (url) => {
    const res = await fetch(url)
    return await res.json();
}

const fetchStudents = async (search = '', pageNo = 1) => {
    try {
        currentSearch = search;
        const { data } = await fetchData(`${apiUrl}/?search=${encodeURIComponent(search)}&page=${pageNo}`)
        console.log(data);

        const { docs: students, hasNextPage, hasPrevPage, nextPage, page, prevPage, totalPages } = data;

        paginate.innerHTML = ''
        paginate.innerHTML = `<li class="page-item ${hasPrevPage ? '' : 'disabled'}">
                <a class="page-link" data-page="${prevPage}"aria-current="page">Previous</a>
            </li>`
        for (let index = 1; index <= totalPages; index++) {
            paginate.innerHTML += `
            <li class="page-item ${page === index ? 'active' : ''}">
            <a class="page-link" data-page="${index}" aria-current="page">${index}</a>
            </li>`
        }
        paginate.innerHTML += `<li class="page-item ${hasNextPage ? '' : 'disabled'}">
                <a class="page-link" data-page="${nextPage}" aria-current="page">Next</a>
            </li>`



        tBody.innerHTML = ''
        students.forEach(student => {
            tBody.innerHTML += `
        <tr>
              <td><img src="http://localhost:3000/uploads/${student.profilePic}" width="50" height="50" class="rounded-circle" /></td>
              <td>${student.firstName}</td>
              <td>${student.lastName}</td>
              <td>${student.email}</td>
              <td>${student.phone}</td>
              <td>${student.gender}</td>
              <td>
                <button class="btn btn-info btn-sm" onclick="viewStudent('${student._id}')">View</button>
                <button class="btn btn-warning btn-sm" onclick="editStudent('${student._id}')">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteStudent('${student._id}')">Delete</button>
              </td>
            </tr>`
        });
    } catch (error) {
        console.error(error);
    }
}


fetchStudents()


const viewStudent = async (id) => {
    const { data: student } = await fetchData(`${apiUrl}/${id}`)
    viewModal.querySelector('#viewName').textContent = `${student.firstName} ${student.lastName}`
    viewModal.querySelector('#viewEmail').textContent = `${student.email}`
    viewModal.querySelector('#viewPhone').textContent = `${student.phone}`
    viewModal.querySelector('#viewGender').textContent = `${student.gender}`
    viewModal.querySelector('#viewProfilePic').src = `http://localhost:3000/uploads/${student.profilePic}`

    new bootstrap.Modal(viewModal).show()
}

input.addEventListener('input', (e) => {
    fetchStudents(e.target.value)
})

const deleteStudent = async (id) => {
    try {
        await fetch(`${apiUrl}/${id}`, {
            method: 'delete'
        })
        fetchStudents(currentSearch);
    } catch (error) {
        console.error(error);
    }
}


const editStudent = async (id) => {
    const { data: student } = await fetchData(`${apiUrl}/${id}`);

    editModal.querySelector('#editFirstName').value = `${student.firstName}`
    editModal.querySelector('#editLastName').value = `${student.lastName}`
    editModal.querySelector('#editEmail').value = `${student.email}`
    editModal.querySelector('#editPhone').value = `${student.phone}`
    editModal.querySelector('#editGender').value = `${student.gender}`
    editModal.querySelector('#editStudentId').value = `${student._id}`

    new bootstrap.Modal(editModal).show()

}


editModal.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log(e.target);
    const studentId = e.target.querySelector('#editStudentId').value;
    const form = new FormData(e.target);

    const res = await fetch(`${apiUrl}/${studentId}`, {
        method: 'put',
        body: form
    })

    if (res.ok) {
        bootstrap.Modal.getInstance(editModal).hide();
        fetchStudents(currentSearch);
    } else {
        alert('error updating student')
    }

})



addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        // Use e.target instead of global addForm in case form reference changes
        const formData = new FormData(e.target);

        const res = await fetch(apiUrl, {
            method: 'POST',
            body: formData,
        });

        if (res.ok) {
            // Clear the form after successful submission
            e.target.reset();
            // Hide the modal properly by referencing the actual modal element
            bootstrap.Modal.getInstance(addModal).hide();
            fetchStudents(currentSearch);
        }

    } catch (error) {
        console.error(error);
        // alert('Error adding student');
    }
});

paginate.addEventListener('click', (e) => {
    e.preventDefault();
    if (!e.target.classList.contains('page-link')) {
        return
    }

    const page = e.target.dataset.page;
    fetchStudents(currentSearch, page)
})




{/*  */ }