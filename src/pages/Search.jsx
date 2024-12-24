import React from 'react';

const Search = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>검색페이지 야호~!</h1>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#111',
    color: '#fff',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
};

export default Search;
