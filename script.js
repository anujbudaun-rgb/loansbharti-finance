document.addEventListener('DOMContentLoaded',()=>{const menu=document.getElementById('menu'),links=document.getElementById('links');if(menu&&links){menu.addEventListener('click',()=>{const o=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(o));menu.textContent=o?'✕':'☰'});links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');menu.textContent='☰';menu.setAttribute('aria-expanded','false')}));}const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();});
// EMI calculator
(function(){const amount=document.getElementById('calcAmount'),rate=document.getElementById('calcRate'),tenure=document.getElementById('calcTenure'),current=document.getElementById('currentEmi');if(!amount||!rate||!tenure)return;const money=n=>'₹'+Math.round(n).toLocaleString('en-IN');function calculate(){const P=Math.max(0,Number(amount.value)||0),r=(Number(rate.value)||0)/1200,n=Math.max(1,Number(tenure.value)||1);const emi=r===0?P/n:P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);const total=emi*n,interest=total-P;document.getElementById('emiResult').textContent=money(emi);document.getElementById('interestResult').textContent=money(interest);document.getElementById('totalResult').textContent=money(total);const old=Number(current?.value)||0;document.getElementById('savingResult').textContent=old>0?(old-emi>=0?'Estimated monthly saving: ':'Estimated monthly increase: ')+money(Math.abs(old-emi)):'Enter your current combined monthly payments to compare';const totalDiff=(old*n)-total;document.getElementById('savingTotalResult').textContent=old>0?(totalDiff>=0?'Potential difference over '+n+' months (before fees): ':'Potential extra cost over '+n+' months (before fees): ')+money(Math.abs(totalDiff)):'Enter current payments to estimate the total difference';} [amount,rate,tenure,current].forEach(x=>x&&x.addEventListener('input',calculate));calculate();})();


// LoansBharti website lead submission
(function(){
  const form = document.getElementById('leadForm');
  if (!form) return;
  const status = document.getElementById('formStatus');
  const submit = form.querySelector('button[type="submit"]');
  const endpoint = "https://script.google.com/macros/s/AKfycbx76WNUyfYAr4jF5J7nA_Yfui76wE_xq-6AaovVCU8q2VT7LZSBQ4S36UsyTcPgcgGVAg/exec";
  const startedAt = Date.now();
  form.addEventListener('submit', async function(event){
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    if (String(data.get('website') || '').trim()) return;
    if (Date.now() - startedAt < 1500) {
      if (status) status.textContent = 'Please wait a moment and try again.';
      return;
    }
    const phone = String(data.get('phone') || '').trim();
    if (!/^[6-9][0-9]{9}$/.test(phone)) {
      form.querySelector('[name="phone"]').setCustomValidity('Enter a valid 10-digit Indian mobile number.');
      form.querySelector('[name="phone"]').reportValidity();
      form.querySelector('[name="phone"]').setCustomValidity('');
      return;
    }
    const payload = new URLSearchParams();
    payload.set('leadSource', 'Website');
    ['name','phone','company','salary','city','loan','website'].forEach(key => payload.set(key, String(data.get(key) || '')));
    if (submit) { submit.disabled = true; submit.textContent = 'Submitting...'; }
    if (status) status.textContent = 'Submitting your enquiry...';
    try {
      await fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: {'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
        body: payload.toString()
      });
      form.reset();
      if (status) status.textContent = 'Thank you! Your enquiry has been submitted. Our team will contact you.';
    } catch (error) {
      if (status) status.textContent = 'Unable to submit right now. Please try again or call +91 95685 80025.';
    } finally {
      if (submit) { submit.disabled = false; submit.textContent = 'Submit Enquiry →'; }
    }
  });
})();
