import React from "react"
import Carousel from 'react-bootstrap/Carousel';
import Header from "./Header";
import Swal from "sweetalert2";




const Home = () => {
  Swal.fire("This app could be improved more but the goal out of it has been achieved successfully enjoy browsing it,sorry this alert will appear in refresh of the home page or after redirecting to it , try admin email: admin@gmail.com pass: 123 to add and modify or delete items, regestier user and login to see the added,deleted or modified items, Big Thanks <3");
  
    return(

        <div>
                <Header/>

            <Carousel>
  <Carousel.Item>
    <div><img height={625} alt="900x500" src="/images/6408f76710a9935109f855d4_smile-min.png" /></div>
  </Carousel.Item>
  <Carousel.Item>
  <div><img height={625} alt="900x500" src="/images/1131w-YZ-0GJ13Nc8.webp" /></div>
  </Carousel.Item>
  <Carousel.Item>
  <div><img height={625} alt="900x500" src="/images/joker-2019-movie-joker-joaquin-phoenix-actor-men-hd-wallpaper-preview.jpg" /></div>
  </Carousel.Item>
  <Carousel.Item>
  <div><img height={625} alt="900x500" src="/images/venomthelastdance_onesheet_1400x2100.jpg" /></div>
  </Carousel.Item>
</Carousel>
<div class="first">
<h3>Comming Soon!!!</h3>
<div class="second">
  <div class="insecond"><img alt="900x500" src="/images/venomthelastdance_onesheet_1400x2100.jpg" /></div>
  <div class="insecond"><img  alt="900x500" src="/images/joker-2019-movie-joker-joaquin-phoenix-actor-men-hd-wallpaper-preview.jpg" /></div>
  <div class="insecond"><img  alt="900x500" src="/images/1131w-YZ-0GJ13Nc8.webp" /></div>

</div>
</div>
<div class="first2">
<h3>Most Watched</h3>
<div class="third">
  <div class="inthird"><img alt="900x500" src="/images/1_2LBfxOAs7pKl80sbQBhd7A@2x.jpg" /></div>
  <div class="inthird"><img  alt="900x500" src="/images/1131w-YZ-0GJ13Nc8.webp" /></div>
  <div class="inthird"><img  alt="900x500" src="/images/6408f76710a9935109f855d4_smile-min.png" /></div>
  <div class="inthird"><img alt="900x500" src="/images/action-movie-poster-template-design-0f5fff6262fdefb855e3a9a3f0fdd361.jpg" /></div>
  <div class="inthird"><img  alt="900x500" src="/images/joker-2019-movie-joker-joaquin-phoenix-actor-men-hd-wallpaper-preview.jpg" /></div>
  <div class="inthird"><img  alt="900x500" src="/images/badboys.jpg" /></div>
  <div class="inthird"><img  alt="900x500" src="/images/comedy.jpg" /></div>
  <div class="inthird"><img alt="900x500" src="/images/creed.jpg" /></div>
  <div class="inthird"><img  alt="900x500" src="/images/images.jpg" /></div>
  <div class="inthird"><img alt="900x500" src="/images/MV5BMjA2NzEzNjIwNl5BMl5BanBnXkFtZTgwNzgwMTEzNzE@._V1_.jpg" /></div>
  <div class="inthird"><img alt="900x500" src="/images/primary-boxcover-hd-800-1200-64ac78ec724d7.jpg" /></div>
  <div class="inthird"><img  alt="900x500" src="/images/zombie-blue-underground-122315.webp" /></div>
 
</div>
</div>

        </div>
    )
}

export default Home;