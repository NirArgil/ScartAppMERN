import { Wrapper } from "./Footer.styles";

const Footer = () => {
  return (
      <Wrapper>

        <footer class="footer-distributed">
            <div class="footer-left">
      <h3>Nir<span>FrontEnd Web Developer</span></h3>

    

    <p class="footer-company-name">Nir Argil &copy; 2021</p>
    </div>

    <div class="footer-center">

      <div>
        <i class="fa fa-map-marker"></i>
        <p><span>21 Rev St</span> Tel Aviv, Israel</p>
      </div>

      <div>
      <i class="fa fa-phone"></i>
      <p>+1 593 123456</p>
      </div>

      <div>
      <i class="fa fa-envelope"></i>
      <p><a href="mailto:support@com">contact@Scart.com</a></p>
      </div>

    </div>

    <div class="footer-right">

    <p class="footer-company-about">
    <span>About Scart</span>
        New shopping platfrom. 
    </p>

    <div class="footer-icons">

    <a href="#"><i class="fab fa-facebook-f"></i></a>
    <a href="#"><i class="fab fa-twitter"></i></a>
    <a href="#"><i class="fab fa-linkedin"></i></a>
    <a href="#"><i class="fab fa-github"></i></a>
    
    </div>
        </div>
      </footer>
      
      </Wrapper>
    
  );
}; 


export default Footer;