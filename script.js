document.addEventListener('DOMContentLoaded',()=>{const menu=document.getElementById('menu'),links=document.getElementById('links');if(menu&&links){menu.addEventListener('click',()=>{const o=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(o));menu.textContent=o?'✕':'☰'});links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');menu.textContent='☰';menu.setAttribute('aria-expanded','false')}));}const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();});
// EMI calculator
(function(){const amount=document.getElementById('calcAmount'),rate=document.getElementById('calcRate'),tenure=document.getElementById('calcTenure'),current=document.getElementById('currentEmi');if(!amount||!rate||!tenure)return;const money=n=>'₹'+Math.round(n).toLocaleString('en-IN');function calculate(){const P=Math.max(0,Number(amount.value)||0),r=(Number(rate.value)||0)/1200,n=Math.max(1,Number(tenure.value)||1);const emi=r===0?P/n:P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);const total=emi*n,interest=total-P;document.getElementById('emiResult').textContent=money(emi);document.getElementById('interestResult').textContent=money(interest);document.getElementById('totalResult').textContent=money(total);const old=Number(current?.value)||0;document.getElementById('savingResult').textContent=old>0?(old-emi>=0?'Estimated monthly saving: ':'Estimated monthly increase: ')+money(Math.abs(old-emi)):'Enter your current combined monthly payments to compare';const totalDiff=(old*n)-total;document.getElementById('savingTotalResult').textContent=old>0?(totalDiff>=0?'Potential difference over '+n+' months (before fees): ':'Potential extra cost over '+n+' months (before fees): ')+money(Math.abs(totalDiff)):'Enter current payments to estimate the total difference';} [amount,rate,tenure,current].forEach(x=>x&&x.addEventListener('input',calculate));calculate();})();


// LoansBharti shared enquiry confirmation (used by every page with #leadForm)
(function(){
  const forms = document.querySelectorAll('form#leadForm');
  if (!forms.length) return;
  const endpoint = "https://script.google.com/macros/s/AKfycbx76WNUyfYAr4jF5J7nA_Yfui76wE_xq-6AaovVCU8q2VT7LZSBQ4S36UsyTcPgcgGVAg/exec";

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
        showStatus('Thank you! Your enquiry has been submitted successfully. Our team will contact you shortly.', true);
        form.reset();
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
