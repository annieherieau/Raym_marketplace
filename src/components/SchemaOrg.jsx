import React from 'react';

function SchemaOrg({ data }) {
  return (
    <script type="application/ld+json">
      {JSON.stringify(data)}
    </script>
  );
}

export default SchemaOrg;