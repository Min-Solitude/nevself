// format each date to YYYY-MM-DD

export function formatDate(timestamp : any) {
    const date = new Date(timestamp);
    
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }
  