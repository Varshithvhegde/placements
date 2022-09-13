const loader = document.querySelector("#loading");
const base_url = "https://script.google.com/macros/s/AKfycbxvZk6Wxi0TAUH8x6oBmTxO6vXhNoIbSpVoL2LdsanF6PjSiN-czA6j712Yzs50fVfgig/exec";
function displayLoading() {
    loader.classList.add("display");
    // to stop loading after some time
    setTimeout(() => {
        loader.classList.remove("display");
    }, 5000);
}
function hideLoading() {
    loader.classList.remove("display");
}
//Searching based on name
function searchStudents() {
    document.getElementById("student_container").innerHTML = "";
    // student_container.innerHTML = "";
    displayLoading();
    // var flag=1;
    const search = document.querySelector("#search").value;
    // const url = `${base_url}?company=${search}`;
    //Filtering the company name with real time search
    // student_container.innerHTML = "";
    fetch(base_url)
        .then(response => response.json())
        .then(characters => showCharacters(characters.data));
    //declare an array
    var arr = [];
    showCharacters = characters => {
        characters.forEach(student => {
            //search the company with matching pattern and display the result
            //remove the duplicates
            if (student.Name.toLowerCase().includes(search.toLowerCase()) && !arr.includes(student.Name.toLowerCase()) && student.Company != "Company" && student.Company != "") {
                // flag=0;
                arr.push(student.Name.toLowerCase());
                const StudentDiv = document.createElement('div');
                StudentDiv.classList.add('student');

            const StudentInnerHTML = `
            <div class="info">
                
                <h3 class="name">${student.Name}</h3>
                <p class="email">${student.Company}</p>
                <p class="email">${student.Salary}LPA</p>
               
            </div>
        `;
            StudentDiv.innerHTML = StudentDiv.innerHTML + StudentInnerHTML;

            student_container.appendChild(StudentDiv);
            }
            hideLoading();
            //Stop reloading the  page
        });
    }
    // if(flag==1){
    //     document.getElementById("student_container").innerHTML = "No results found";
    // }
    
                


    // fetch(url)
    //     .then(response => response.json())
    //     .then(characters => showCharacters(characters.data));
        
    //     showCharacters = characters => {
    //         characters.forEach(student => {
    //             const StudentDiv = document.createElement('div');
    //         StudentDiv.classList.add('student');

    //         const StudentInnerHTML = `
    //                 <div class="info">
    //                     <h2>${student.Name}</h2>
                       
                       
    //                 </div>
    //             `;
    //             StudentDiv.innerHTML = StudentDiv.innerHTML + StudentInnerHTML;

    //         student_container.appendChild(StudentDiv);
    //         });
    //     }

}


//function to filter students based on company
function filterStudents() {
    student_container.innerHTML = "";
    if(document.querySelector("#company").value == "ALL"){
        fetchStudents();
    }
        
    displayLoading();
    //clear the student container
    
    const company = document.querySelector("#company").value;
    
    const url = `${base_url}?company=${company}`;
    fetch(url)
        .then(response => response.json())
        .then(characters => showCharacters(characters.data));

    showCharacters = characters => {
        characters.forEach(student => {
            const StudentDiv = document.createElement('div');
            StudentDiv.classList.add('student');

            const StudentInnerHTML = `
            <div class="info">
                
                <h3 class="name">${student.Name}</h3>
                <p class="email">${student.Company}</p>
                <p class="email">${student.Salary}LPA</p>
               
            </div>
        `;
            StudentDiv.innerHTML = StudentDiv.innerHTML + StudentInnerHTML;

            student_container.appendChild(StudentDiv);
        });
        hideLoading();
    }
}
displayLoading();
const fetchStudents = async () => {

   fetch(base_url)
    .then(response => response.json())
    
    .then(characters => showCharacters(characters.data));
    
    showCharacters = characters => {
            characters.forEach(student => {
                if(student.Company != "Company"&& student.Company != ""){
                //add company name to the dropdown and remove duplicates
                const company = document.querySelector("#company");
                const option = document.createElement("option");
                option.value = student.Company;
                option.textContent = student.Company;
                company.appendChild(option);
                //remove duplicates
                const options = Array.from(document.querySelectorAll("#company option"));
                const uniqueOptions = [...new Set(options.map(option => option.value))];
                company.innerHTML = "";
                uniqueOptions.forEach(uniqueOption => {
                    const option = document.createElement("option");
                    option.value = uniqueOption;
                    option.textContent = uniqueOption;
                    company.appendChild(option);
                });
            }
                
                if(student.Name!="Name"&& student.Name!=""){
                const StudentDiv = document.createElement('div');    
                StudentDiv.classList.add('student');
            
            const StudentInnerHTML = `
            <div class="info">
                
                <h3 class="name">${student.Name}</h3>
                <p class="email">${student.Company}</p>
                <p class="email">${student.Salary}LPA</p>
               
            </div>
        `;
        StudentDiv.innerHTML = StudentDiv.innerHTML + StudentInnerHTML;
    
        student_container.appendChild(StudentDiv); 
    }
   
    });
    hideLoading();
    };
        // });
    
}
fetchStudents();