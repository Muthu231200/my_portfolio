import profile from "../assets/profile.jpg";

function About() {
  return (
    
    <div className="about">
         
     <img src={profile} alt="profile" className="profile-img" />
      <h2>About Me</h2>

     I am a passionate developer focused on creating clean and user-friendly applications. 
I enjoy solving real-world problems through logical thinking and practical solutions. 
With hands-on experience in application development, I aim to deliver efficient and high-quality work. 
I am a team player who values collaboration and continuous learning.
    </div>
  );
}

export default About;