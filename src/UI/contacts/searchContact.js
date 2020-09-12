export function search (data, text,save){
  try {
    const newData = data.filter(item => {
      const displayName=item.displayName?item.displayName:`${item.first_name}${item.last_name}`
      const itemData = `${displayName.toUpperCase()}`
       const textData = text.toUpperCase()
       return itemData.indexOf(textData) > -1
    });
    save(newData)    
  } catch (error) {
    console.log(error,'error')
  } 
  };