<template>

<div>
    <h1>{{item.title}}</h1>
    <div class="container-fluid">
          <div class="column" v-for="photo in photos " v-bind:key="photo.id" >
                <img  :src="photo.url">      
            
            </div>
</div>

<div class="informationitem">
<h1>Precio: ${{item.price}}</h1>
<h2>Condicion: {{item.condition}}</h2>
<h3>{{item.warranty}}</h3>
<br>
<div>

  <h1>Reseña del vendedor</h1>
<p>
Reseñas Ppositivas: {{seller_reputation.transactions.ratings.positive*100 || 0}} <br>
Reseñas Neutrales: {{seller_reputation.transactions.ratings.neutral*100 || 0}} <br>
Reseñas Negativas: {{seller_reputation.transactions.ratings.negatice*100 || 0}} <br>
Trascacciones Completadas: {{seller_reputation.transactions.completed}} <br>
Transacciones Canceladas: {{seller_reputation.transactions.canceled}} <br>
</p>



</div>
</div>
</div>
  
    


</template>





<script>
import Axios from 'axios'

export default {
    data(){
        return{
            urlItem: this.$route.params.itemId,
            item: null || '',
            photos: [],
            sellerId: null,
            seller_reputation: null
        }
    },

    
 mounted() {
        console.log(this.$route.params.itemId)
        Axios.get("https://api.mercadolibre.com/items/"+this.urlItem)
            .then((res)=>{
                        
                this.item = res.data;
                this.photos=res.data.pictures;
                this.sellerId = this.item.seller_id;
                console.log(this.item);
                console.log(this.photos);
                console.log(this.sellerId)
                 console.log("https://api.mercadolibre.com/users/"+this.sellerId);
                this.getSellerReputation();

            })

          
    },

    methods:{


        getSellerReputation(){

           Axios.get("https://api.mercadolibre.com/users/"+this.sellerId)
           .then((res)=>{
                  this.seller_reputation=res.data.seller_reputation;
                  console.log(this.seller_reputation.level_id);
           })
        }


    }


}
</script>



<style>

.container-fluid{
  float: left;
width: 60%;
align-items: left;
margin-left:0px ;
height: 40%;

}


/*Responsive layout - makes a two column-layout instead of four columns */
@media screen and (max-width: 800px) {
  .column {
    flex: 50%;
 
  }
}

/* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .column {
    flex: 50%;
    max-width: 50%;
  }
}

.informationitem{

padding-top: 10%;

}

</style>