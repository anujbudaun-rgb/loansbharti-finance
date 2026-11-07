document.addEventListener('DOMContentLoaded',()=>{const menu=document.getElementById('menu'),links=document.getElementById('links');if(menu&&links){menu.addEventListener('click',()=>{const o=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(o));menu.textContent=o?'✕':'☰'});links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');menu.textContent='☰';menu.setAttribute('aria-expanded','false')}));}const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();});
// EMI calculator
(function(){const amount=document.getElementById('calcAmount'),rate=document.getElementById('calcRate'),tenure=document.getElementById('calcTenure'),current=document.getElementById('currentEmi');if(!amount||!rate||!tenure)return;const money=n=>'₹'+Math.round(n).toLocaleString('en-IN');function calculate(){const P=Math.max(0,Number(amount.value)||0),r=(Number(rate.value)||0)/1200,n=Math.max(1,Number(tenure.value)||1);const emi=r===0?P/n:P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);const total=emi*n,interest=total-P;document.getElementById('emiResult').textContent=money(emi);document.getElementById('interestResult').textContent=money(interest);document.getElementById('totalResult').textContent=money(total);const old=Number(current?.value)||0;document.getElementById('savingResult').textContent=old>0?(old-emi>=0?'Estimated monthly saving: ':'Estimated monthly increase: ')+money(Math.abs(old-emi)):'Enter your current combined monthly payments to compare';const totalDiff=(old*n)-total;document.getElementById('savingTotalResult').textContent=old>0?(totalDiff>=0?'Potential difference over '+n+' months (before fees): ':'Potential extra cost over '+n+' months (before fees): ')+money(Math.abs(totalDiff)):'Enter current payments to estimate the total difference';} [amount,rate,tenure,current].forEach(x=>x&&x.addEventListener('input',calculate));calculate();})();


// LoansBharti shared enquiry confirmation (used by every page with #leadForm)
(function(){
  const forms = document.querySelectorAll('form#leadForm');
  if (!forms.length) return;
  const endpoint = "https://script.google.com/macros/s/AKfycbx76WNUyfYAr4jF5J7nA_Yfui76wE_xq-6AaovVCU8q2VT7LZSBQ4S36UsyTcPgcgGVAg/exec";

  function showThankYouScreen(){
    if (document.getElementById('lbThankYouScreen')) return;
    const screen = document.createElement('section');
    screen.id = 'lbThankYouScreen';
    screen.setAttribute('role','dialog');
    screen.setAttribute('aria-modal','true');
    screen.setAttribute('aria-labelledby','lbThankYouTitle');
    screen.style.cssText = 'position:fixed;inset:0;z-index:2147483000;overflow-y:auto;display:flex;align-items:center;justify-content:center;padding:24px 16px;background:linear-gradient(145deg,#f3f7ff 0%,#ffffff 52%,#edf4ff 100%);font-family:Arial,Helvetica,sans-serif;box-sizing:border-box;';
    screen.innerHTML = `
      <div style="width:100%;max-width:520px;background:#fff;border:1px solid #e5eaf3;border-radius:24px;padding:32px 24px;box-shadow:0 20px 60px rgba(20,55,110,.12);text-align:center;box-sizing:border-box;">
        <div style="width:76px;height:76px;margin:0 auto 18px;border-radius:50%;background:#e8f7ee;color:#16834a;display:flex;align-items:center;justify-content:center;font-size:42px;font-weight:700;">✓</div>
        <div style="font-size:13px;letter-spacing:1.8px;text-transform:uppercase;font-weight:700;color:#2463b8;margin-bottom:10px;">LoansBharti</div>
        <h1 id="lbThankYouTitle" style="font-size:32px;line-height:1.2;color:#142b4e;margin:0 0 12px;">Thank You!</h1>
        <p style="font-size:17px;line-height:1.6;color:#42536b;margin:0 0 24px;">Your enquiry has been received. Our team will review your details and contact you shortly.</p>
        <div style="background:#f5f8fd;border-radius:16px;padding:20px;text-align:left;margin:0 0 24px;">
          <h2 style="font-size:17px;color:#18345b;margin:0 0 16px;">What happens next?</h2>
          <div style="display:flex;gap:12px;align-items:flex-start;margin:12px 0;color:#40516a;font-size:14px;line-height:1.5;"><span style="background:#dceaff;color:#205db1;border-radius:50%;width:26px;height:26px;flex:0 0 26px;display:flex;align-items:center;justify-content:center;font-weight:700;">1</span><span>Our team reviews your enquiry.</span></div>
          <div style="display:flex;gap:12px;align-items:flex-start;margin:12px 0;color:#40516a;font-size:14px;line-height:1.5;"><span style="background:#dceaff;color:#205db1;border-radius:50%;width:26px;height:26px;flex:0 0 26px;display:flex;align-items:center;justify-content:center;font-weight:700;">2</span><span>We contact you to understand your requirements.</span></div>
          <div style="display:flex;gap:12px;align-items:flex-start;margin:12px 0 0;color:#40516a;font-size:14px;line-height:1.5;"><span style="background:#dceaff;color:#205db1;border-radius:50%;width:26px;height:26px;flex:0 0 26px;display:flex;align-items:center;justify-content:center;font-weight:700;">3</span><span>We explore suitable loan consolidation options based on your profile.</span></div>
        </div>
        <a href="/" style="display:block;width:100%;box-sizing:border-box;background:#205bb5;color:#fff;text-decoration:none;padding:16px 20px;border-radius:12px;font-size:16px;font-weight:700;box-shadow:0 8px 18px rgba(32,91,181,.2);">Visit LoansBharti Website →</a>
        <p style="font-size:12px;line-height:1.5;color:#7b8798;margin:18px 0 0;">Your information is handled securely. Never share OTPs, PINs or banking passwords.</p>
        <div style="font-size:13px;color:#8490a1;margin-top:18px;">Many Loans. One EMI.</div>
      </div>`;
    document.body.appendChild(screen);
    document.body.style.overflow = 'hidden';
    const homeLink = screen.querySelector('a');
    homeLink.addEventListener('click',function(){ document.body.style.overflow = ''; });
    homeLink.focus();
  }

  forms.forEach(function(form){
    const status = form.querySelector('#formStatus') || form.querySelector('.status');
    const submit = form.querySelector('button[type="submit"], input[type="submit"]');
    const startedAt = Date.now();

    function showStatus(message, success){
      let box = status;
      if (!box) {
        box = document.createElement('div');
        box.className = 'status';
        box.setAttribute('role','status');
        box.setAttribute('aria-live','polite');
        if (submit) submit.insertAdjacentElement('afterend', box);
        else form.appendChild(box);
      }
      box.textContent = message;
      box.hidden = false;
      box.style.setProperty('display','block','important');
      box.style.setProperty('visibility','visible','important');
      box.style.setProperty('opacity','1','important');
      box.style.setProperty('min-height','42px');
      box.style.setProperty('padding','12px');
      box.style.setProperty('margin-top','12px');
      box.style.setProperty('border-radius','6px');
      box.style.setProperty('background', success ? '#eaf8f0' : '#fff4e5');
      box.style.setProperty('color', success ? '#17663e' : '#805000');
      box.scrollIntoView({behavior:'smooth',block:'nearest'});
    }

    form.addEventListener('submit', async function(event){
      event.preventDefault();
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      if (String(data.get('website') || '').trim()) return;
      if (Date.now() - startedAt < 1500) {
        showStatus('Please wait a moment and try again.', false);
        return;
      }

      const phone = String(data.get('phone') || '').trim();
      if (!/^[6-9][0-9]{9}$/.test(phone)) {
        const phoneField = form.querySelector('[name="phone"]');
        if (phoneField) {
          phoneField.setCustomValidity('Enter a valid 10-digit Indian mobile number.');
          phoneField.reportValidity();
          phoneField.setCustomValidity('');
        }
        return;
      }

      const payload = new URLSearchParams();
      payload.set('leadSource', 'Website');
      ['name','phone','company','salary','city','loan','website'].forEach(function(key){
        payload.set(key, String(data.get(key) || ''));
      });

      if (submit) {
        submit.disabled = true;
        if (submit.tagName === 'INPUT') submit.value = 'Submitting...';
        else submit.textContent = 'Submitting...';
      }
      showStatus('Submitting your enquiry...', false);

      try {
        await fetch(endpoint, {
          method: 'POST',
          mode: 'no-cors',
          headers: {'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
          body: payload.toString()
        });
        form.reset();
        showThankYouScreen();
      } catch (error) {
        showStatus('Unable to submit right now. Please try again or call +91 95685 80025.', false);
      } finally {
        if (submit) {
          submit.disabled = false;
          if (submit.tagName === 'INPUT') submit.value = 'Submit Enquiry →';
          else submit.textContent = 'Submit Enquiry →';
        }
      }
    });
  });
})();
