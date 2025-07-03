class ViewYoutube {
      constructor(src) {
          this.src = src;
          this.viewYoutube = this.viewYoutube.bind(this);
          this.closeYoutube = this.closeYoutube.bind(this);
          this.init();
      }
      init() {
          document.querySelector('.youtube_btn').addEventListener('click', this.viewYoutube);
          document.querySelector('.youtube_pop .closed').addEventListener('click', this.closeYoutube);
      }
      viewYoutube() {
          document.querySelector('.youtube_pop').style.display = 'block';
          document.querySelector('.youtube_pop iframe').src = this.src;
      }
      closeYoutube() {
          document.querySelector('.youtube_pop').style.display = 'none';
          document.querySelector('.youtube_pop iframe').src = '';
      }
  }

  const viewYoutube = new ViewYoutube("https://www.youtube.com/embed/9FL3xBDW-po");