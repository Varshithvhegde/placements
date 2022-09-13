const loader = document.querySelector("#loading");
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
displayLoading();
const fetchStudents = async () => {

   fetch('https://script.google.com/macros/s/AKfycbw3jGbB0Cqz9jHctj2jye0XfRZVLkx4ae5ASECgpHPbwVxM5PI8kpsynRL0hEnQ3QVa1w/exec')
    .then(response => response.json())
    
    .then(characters => showCharacters(characters.data));
    
    showCharacters = characters => {
            characters.forEach(student => {
        //     if(student.Name!="Name"){
                
                
        //     const StudentDiv = document.createElement('div');    
        //     StudentDiv.classList.add('student');
        //     if(student.USN=="4MT19CS174"){
        // const StudentInnerHTML = `
        //     <div class="info"  onclick="window.location.href = 'https://github.com/Varshithvhegde';">
            
               
        //         <h3 class="name" style="color:red;">${student.Name}</h3>
               
        //     </div>
        // `;
        // StudentDiv.innerHTML = StudentDiv.innerHTML + StudentInnerHTML;
    
        // student_container.appendChild(StudentDiv);      
        // }
        // else{
            const StudentInnerHTML = `
            <div class="info">
               
                <h3 class="name">${student.Name}</h3>
               
            </div>
        `;
        StudentDiv.innerHTML = StudentDiv.innerHTML + StudentInnerHTML;
    
        student_container.appendChild(StudentDiv); 
        }
            );};
        // });
        hideLoading();
    }
    

fetchStudents();