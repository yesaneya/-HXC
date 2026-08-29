// 菡羞草企业官网 - 交互脚本
(function () {
  const header = document.querySelector('.header');
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-link');

  // 导航滚动效果
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // 移动端菜单切换
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      const isOpen = navLinks.classList.contains('active');
      menuBtn.setAttribute('aria-expanded', isOpen);
    });

    // 点击链接后关闭菜单
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 当前页面导航高亮
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // 滚动显现动画
  const revealElements = document.querySelectorAll('.card, .product-card, .team-card, .value-item, .patent-card, .contact-card');

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    revealElements.forEach(function (el) {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 80) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }

  revealElements.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('load', revealOnScroll);

  // 联系表单验证与提交提示
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const content = document.getElementById('message').value.trim();

      if (!name || !phone) {
        alert('请填写姓名和联系电话，方便我们与您取得联系。');
        return;
      }

      const phoneRegex = /^1[3-9]\d{9}$/;
      if (!phoneRegex.test(phone)) {
        alert('请输入正确的手机号码。');
        return;
      }

      // 模拟提交成功
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = '提交中...';
      submitBtn.disabled = true;

      setTimeout(function () {
        alert('感谢您的留言，我们会尽快与您联系！');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1200);
    });
  }
})();
