(() => {
  const key = 'probability-last-chapter-v1';
  const save = value => { try { localStorage.setItem(key, value); } catch (_) {} };
  try {
    const file = location.pathname.split('/').pop() || 'index.html';
    const match = /^chapter([2-8])\.html$/.exec(file);
    if (match) save(match[1]);
    if (file !== 'index.html') return;
    const saveFirstChapter = () => {
      if (/^#s[1-4]$/.test(location.hash)) save('1');
    };
    saveFirstChapter();
    window.addEventListener('hashchange', saveFirstChapter);
    const firstSection = document.getElementById('s1');
    if (firstSection) window.addEventListener('scroll', () => {
      if (window.scrollY > 100 && firstSection.getBoundingClientRect().top < window.innerHeight * 0.5) save('1');
    }, { passive: true });
    const saved = localStorage.getItem(key);
    if (!/^[1-8]$/.test(saved || '')) return;
    const heading = document.querySelector('main h1');
    if (!heading) return;
    const box = document.createElement('p');
    box.className = 'note';
    const a = document.createElement('a');
    a.href = saved === '1' ? 'index.html#s1' : `chapter${saved}.html`;
    a.textContent = `继续上次阅读：第 ${saved} 章 →`;
    const tip = document.createElement('small');
    tip.textContent = '（记录保存在当前设备的浏览器中）';
    box.append(a, document.createTextNode(' '), tip);
    heading.insertAdjacentElement('afterend', box);
  } catch (_) {
    // Reading the lessons still works when the browser blocks local storage.
  }
})();
