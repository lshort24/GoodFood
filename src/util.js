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

export {formatBreaks, formatSteps, validateHtml}