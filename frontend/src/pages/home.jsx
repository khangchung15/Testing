<<<<<<< HEAD
import React from 'react'

function home() {
  return (
    <div>
        <h1>Welcome to CoogZoo!</h1>
    </div>
  )
}

export default home
=======
import React from 'react';
import './home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to the Zoo!</h1>
          <p>Explore the wonders of wildlife, learn about fascinating animals, and enjoy a fun-filled day with family and friends.</p>
          <a href="/tickets" className="cta-button">Get Tickets Now</a>
        </div>
      </header>

      <section className="about-section">
        <h2>About Our Zoo</h2>
        <p>Our zoo is home to a wide variety of animals from around the world. We are committed to animal conservation and providing a safe and enriching environment for all our wildlife.</p>
        <a href="/exhibits" className="cta-button">Explore Exhibits</a>
      </section>

      <section className="highlights-section">
        <h2>Zoo Highlights</h2>
        <div className="highlight-cards">
          <div className="highlight-card">
            <img src="https://th.bing.com/th/id/R.21e5eb81b9d866c764b49bc3112c4d8f?rik=sQi9JZdPn0lOug&riu=http%3a%2f%2f2.bp.blogspot.com%2f-gvTrTueZaac%2fU1JYAtFP9jI%2fAAAAAAAABLA%2f6IRlSIrcsH4%2fs1600%2f12.00pm%2b-%2bCopy.JPG&ehk=Km%2b6LUQjyK0XmlkunLbMqZ8aB0wQVn7NowfY0OlebpM%3d&risl=&pid=ImgRaw&r=0" alt="Behind the scenes" />
            <h3>Behind-the-Scenes Tours</h3>
            <p>Get an exclusive look at how our zookeepers care for the animals.</p>
          </div>
          <div className="highlight-card">
            <img src="https://scz.org/wp-content/uploads/2018/04/giraffe_feeding.jpg" alt="Animal feeding times" />
            <h3>Animal Feeding Times</h3>
            <p>Join us during feeding sessions and watch your favorite animals eat!</p>
          </div>
          <div className="highlight-card">
            <img src="https://th.bing.com/th/id/OIP.iq0lMV-f1pivf96NQ_FpUQHaE7?rs=1&pid=ImgDetMain" alt="Upcoming events" />
            <h3>Upcoming Events</h3>
            <p>Check out special events, seasonal activities, and more!</p>
            <a href="/events" className="cta-button">See Events</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
>>>>>>> e93028ebdbd00e1b208fa80fd4e317029cfd5d8f