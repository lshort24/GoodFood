function formatBreaks(str) {
   if (!str || str.length === 0) {
      return '';
   }

   const html = str.replace(/\r\n|\n|\r/g, '<br />');

   if (validateHtml(html)) {
      return html;
   }

   return ('<p>Invalid HTML</p>');
}

function formatSteps(str) {
   if (!str || str.length === 0) {
      return '';
   }

   const steps = str.split(/\r\n|\n|\r/g);
   const lines = steps.map((line) => {
      if (line.trim().length === 0) {
         return null;
      }
      return '<li style="margin-bottom: 10px">' + line + '</li>';
   });
   const html = '<ol>' + lines.join('') + '</ol>';

   if (validateHtml(html)) {
      return html;
   }

   return ('<p>Invalid HTML</p>');
}

function validateHtml(html) {
   const matches = /<(\w+)/g.exec(html);

   if (!matches) {
      return true;
   }
   for (let i = 1; i < matches.length; i++) {
      switch (matches[i]) {
         case 'br':
         case 'ol':
         case 'li':
            continue;
         default:
            return false;
      }
   }

   return true;
}

function hasCookie(name) {
   return document.cookie.split(';').some(c => {
      return c.trim().startsWith(name + '=');
   });
}

function getCookie(name) {
   return document.cookie.split(';').find(c => {
      return c.trim().startsWith(name + '=');
   });
}

function getCookieValue(name) {
   if (hasCookie(name)) {
      return getCookie(name).split('=')[1];
   }
   return null;
}

function deleteCookie( name, path, domain ) {
   if( hasCookie( name ) ) {
      document.cookie = name + "=" +
          ((path) ? ";path="+path:"")+
          ((domain)?";domain="+domain:"") +
          ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
   }
}

export {
   formatBreaks,
   formatSteps,
   validateHtml,
   hasCookie,
   getCookie,
   getCookieValue,
   deleteCookie
}