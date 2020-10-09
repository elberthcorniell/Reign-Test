import React, { useState, useEffect } from 'react';
import './App.css';
import { Grid, Container } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
let App = () => {
  let [news, setNews] = useState([{ id: 1 }])
  let [deleted, setDeleted] = useState([])
  let fetchNews = async () => {
    let res = await fetch(`/api/news`)
    let { news } = await res.json()
    setNews(news)
  }
  let saveDeleted = (item) => {
    let deleted = JSON.parse(localStorage.getItem('deleted')) || []
    deleted.push(item)
    localStorage.setItem('deleted', JSON.stringify(deleted))
    setDeleted(deleted)
  }
  let formatDate = (date) => {
    date = new Date(date)
    let now = new Date(Date.now())
    let [nowM, dateM] = [now.getTime(), date.getTime()]
    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    if(dateM > nowM - nowM % 86400000)
      return new Date(date).toLocaleTimeString()
    if((dateM < nowM - nowM % 86400000) && (dateM > ((nowM - 86400000) - nowM % 86400000)))
      return 'yesterday' 
    return `${month[date.getMonth()]} ${date.getDate()}`
  }
  useEffect(() => {
    fetchNews()
    setDeleted(JSON.parse(localStorage.getItem('deleted')) || [])
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <h1>HN Feed</h1>
        <h2>{'We <3 Hacker news'}</h2>
      </header>
      <Container className="table-container">
        {news.map(data => {
          let { story_title, title, author, story_url, created_at, story_id } = data
          let text = story_title || title || undefined
          if (text && deleted.indexOf(story_id) < 0) return (
            <Grid>
              <tr className="news" onClick={() => { story_url ? window.open(story_url) : alert('URL not available') }}>
                <td className="black-text" style={{ width: '100%' }}>
                  {text}
                  <strong className="gray-text">&nbsp;-&nbsp;{author}&nbsp;-&nbsp;</strong>
                </td>
                <td ></td>
                <td><strong className="black-text">{formatDate(created_at)}</strong></td>
                <td className="black-text" style={{ minWidth: 60 }} onClick={e => { saveDeleted(story_id); e.stopPropagation() }}><DeleteForeverIcon id="trash" style={{ margin: 'auto', zIndex: 2 }} /></td>
              </tr>
            </Grid>
          )
        })}
      </Container>
    </div>
  );
}

export default App;
