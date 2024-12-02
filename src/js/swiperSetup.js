import Swiper from 'swiper';
import 'swiper/css';

export const initializeSwiper = () => {
  const swiper = new Swiper('.swiper', {
    loop: true,
    speed: 1000,
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 300,
  });

  const nextButton = document.querySelector('.swiper-button-next');
  const prevButton = document.querySelector('.swiper-button-prev');

  nextButton.addEventListener('click', () => {
    swiper.slideNext();
  });

  prevButton.addEventListener('click', () => {
    swiper.slidePrev();
  });
};
