<template>

<div>
    <div>
        <nav class="navbar navbar-dark bg-dark justify-content-between">
  <a class="navbar-brand">Wecome to Victor's Shop</a>

      
      <div>
            <input  v-on:keyup.enter="searchData" v-model="search" class="form-control mr-sm-2" type="text" placeholder="Search" id="search" aria-label="Search">
      </div>
    <div>
        <button v-on:click="searchData"  class="btn btn-outline-success my-2 my-sm-0"  id="searchbtn">Search</button>
    </div>
 
      
    

  

</nav>
    </div>
 

<div class="card shadow p-3 mb-5 bg-white rounded" style="width: 18rem;" v-for="item in items" :key ="item.id" v-on:click="getItemProfile" >
<router-link :to="{ name: 'ItemProfile', params: { itemId: item.id }}">

  <img  v-if="item.thumbnail" class="card-img-top" id="thumbnail"  alt="Card image cap" :src="item.thumbnail" >
  <div class="card-body">
    <h5 class="card-title">${{item.price}}</h5>
    <p class="card-text" style="fontsize: 29px">{{item.title}}</p>
    <p class="card-text">{{item.address.state_name}}</p>
  </div>
  </router-link>
</div>
<div id="Paginator">
    <nav aria-label="Page navigation example" id="pagination">
  <ul class="pagination">
    <li class="page-item"><a class="page-link"  v-on:click="previouspage">Previous</a></li>
    <li class="page-item"><a class="page-link" >{{currentPage-1}}</a></li>
    <li class="page-item active">
      <a class="page-link" href="#">{{currentPage}} <span class="sr-only">(current)</span></a>
    </li>
    <li class="page-item"><a class="page-link" >{{currentPage+1}}</a></li>
    <li class="page-item"><a class="page-link"  v-on:click="nextpage">Next</a></li>
  </ul>
</nav>
</div>

</div>
</template>




<script>
//imagen price nombre reseña link
import axios from 'axios'

export default {
    data(){
        return{
            items: null,
            imagen: null,
            search :'monitores',
            currentPage:1,
            auxpage:0,
           

        }
    },



    mounted() {
        this.getHome();
       
    },

    methods: {
        searchData(){
            axios.get("https://api.mercadolibre.com/sites/MCO/search?q="+this.search+"&offset="+this.auxpage)
            .then( (res)=>{
                this.items = res.data.results;
                    console.log(this.items);

            }).catch((e)=>console.log(e));
        },

        getHome(){
             console.log(this.search + "hola");
            axios.get("https://api.mercadolibre.com/sites/MCO/search?q=monitor&offset="+this.auxpage)
            .then( (res)=>{
                   this.items = res.data.results;
               
                    console.log(this.items);
                
            }).catch((e)=>console.log(e));

        },

        nextpage(){
            
            this.currentPage=this.currentPage+1;
           this.auxpage= this.auxpage  +50 ;

           this.searchData();

                console.log(this.auxpage)

        },
        
         previouspage(){

                if (this.currentPage==1) {
                    alert("No existe la pagina")
                }else{
                     this.currentPage=this.currentPage-1;
                    this.auxpage= this.auxpage -50 ;                 
                

                    this.searchData();

                }
                console.log("anterior")

         },

         getItemProfile(){

            


         }
       
       
    }
}
</script>




<style scoped>

.card{

    margin: 20px 20px 20px 20px ;
    display: inline-block;
    
}

#thumbnail{
height: 90px;
width: 90px;

}


#pagination{
   
    display: flex;
    list-style: none;
    padding-top: 30px;
    margin-left: 45%;

}

#Paginator{

width: 100%;
height: 100px;
margin-top: 30px;
background-color: #343a40;
align-items: center;
}
.navbar{

    width: 100%;
}
  

</style>>
    