/* load phones data */
const loadPhones = async(searchText,dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const response = await fetch(url)
    const Data = await response.json();
    displayPhones(Data.data,dataLimit);
}
/* load phones data end*/


/* display phone data */
const displayPhones = (phones,dataLimit) => {
    const phoneContainer = document.getElementById('phones-container');
    phoneContainer.textContent= '';
    /* display 15 phones only */
    const seeMore = document.getElementById('see-more');
    if(dataLimit && phones.length > 15){
        phones = phones.slice(0, 15);
        seeMore.classList.remove('d-none')
    }
    else{
        seeMore.classList.add('d-none')
    }
/* display phone data end */
    
    
    /* display alert message */
    const alertMsg = document.getElementById('alert-msg');
    if(phones.length === 0){
        alertMsg.classList.remove('d-none');
    }
    else{
        alertMsg.classList.add('d-none');
    }
    /* display alert message end */

    /* phone card dynamic */
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML=`
        <div class="card p-3 rounded-5 bg-info">
        <img src="${phone.image}" class="card-img-top rounded-5" alt="...">
        <div class="card-body rounded-5">
        <h5 class="card-title fw-bold">${phone.phone_name}</h5>
        <p class="card-text">A mobile phone is a wireless handheld device that allows users to make and receive calls.</p>
        <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show More <i class="fa-solid fa-angles-right"></i></button>
        </div>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    })
    /* phone card dynamic end */


    /* Stop loader */
    toggleLoader(false);
}

/* search section */
const processSearch = (dataLimit) =>{
    toggleLoader(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText,dataLimit);
}
/* search section end */


document.getElementById('btn-search').addEventListener('click',function(){
    /* start loader */
 processSearch(10)
})
/* search by enter key  */
document.getElementById('search-field').addEventListener('keypress',function(e){
    if(e.key === 'enter'){
        processSearch(15)
    }
})
/* search by enter key  end */


/* loader animation */
const toggleLoader = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none')
    }
}
/* loader animation end */


/* not the best way to show all data in see more button */
document.getElementById('btn-see-more').addEventListener('click',function(){
    processSearch();
})

const loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url)
    const data = await res.json();
    displayPhoneDetails(data.data);
}
/* not the best way to show all data in see more button end */

/* phone detail modal section */
const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-modal-body');
    console.log(phone.mainFeatures.sensors[0]);
    phoneDetails.innerHTML= `
    <p class="fw-bold">Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Information Found'}</P>
    <p class="fw-bold"> Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No storage Information Found'}</p>
    <p class="fw-bold">Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information found'}</p>
    <p class="fw-bold">Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'No Sensor Found in this'}</p>
    `
}
/* phone detail modal section end */

// loadPhones()

