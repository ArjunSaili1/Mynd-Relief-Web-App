const styles = theme => ({

    content: {
      height: 'calc(100vh - 100px)',
      overflow: 'none',
      padding: '25px',
      marginLeft: '300px',
      boxSizing: 'border-box',
      overflowY: 'scroll',
      overflowX: 'none',
      top: '50px',
      width: '100vw',
      position: 'absolute'
    },
  
    userSent: {
      float: 'left',
      clear: 'both',
      padding: '20px',
      boxSizing: 'border-box',
      wordWrap: 'break-word',
      marginTop: '10px',
      backgroundColor: '#707BC4',
      color: 'white',
      width: '300px',
      borderRadius: '10px'
    },
  
    friendSent: {
      float: 'right',
      clear: 'both',
      padding: '20px',
      boxSizing: 'border-box',
      wordWrap: 'break-word',
      marginTop: '10px',
      backgroundColor: '#707BC4',
      color: 'white',
      width: '300px',
      borderRadius: '10px'
    },
  
    chatHeader: {
      width: '100vw',
      height: '50px',
      backgroundColor: '#344195',
      position: 'fixed',
      fontSize: '18px',
      textAlign: 'center',
      color: 'white',
      paddingTop: '10px',
      boxSizing: 'border-box'
    }
  
  });
  
  export default styles;