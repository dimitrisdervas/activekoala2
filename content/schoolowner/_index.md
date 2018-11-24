+++
date = "2016-11-05T21:05:33+05:30"
title = "Καταχώρηση"
index= "false"
+++

Η καταχώρηση θα είναι πάντα δωρεάν και οι χρεώσεις θα αφορούν για τον έξτρα κόπο να προσθέτουμε τρόπους επικοινωνίας όπως messenger chat, online forms, κτλ.


## Απλή καταχώρηση

### Βήμα 1

Απλά στείλτε τη διεύθυνση της σελίδας σας στο Facebook και εμείς θα σας καταχωρήσουμε στο ActiveKoala.

<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" name="contact" method="POST" netlify-honeypot="bot-field" netlify>
	<p class="hidden">
    <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
  </p>
  <div>
    <label class="block text-grey-darker text-x1 font-bold mb-2">Oνομα:</label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"type="text" name="name" />
  </div> 
   <div>
    <label>Email:</label> <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" type="text" name="email" />
  </div>
     <div>
    <label>Facebook Page: <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" type="text" name="facebook" /></label>
  </div>
  <div>
    <label>ΣΧΟΛΙΑ: <textarea name="message"></textarea></label>
  </div>

  <div data-netlify-recaptcha></div>
  <div>
 <button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type=”submit”>Αποστολή</button>
  </div>

</form>


### Βήμα 2

Στη συνέχεια θα σας στείλουμε το λινκ της καταχώρησης με τα στοιχεία που βρήκαμε στο facebook.

<script src="https://widget.flowxo.com/embed.js" data-fxo-widget="eyJ0aGVtZSI6IiMwMDkyY2MiLCJ3ZWIiOnsiYm90SWQiOiI1YjZjMDA3ZTM5YzM2ODAwNjI4NWZlZWUiLCJ0aGVtZSI6IiMwMDkyY2MifX0=" async defer></script>