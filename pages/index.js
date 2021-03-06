import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'
import styles from '../styles/Home.module.css';
import axios from 'axios';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'


export default function Home() {

  const router = useRouter()

  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('https://fejs-c7-api.herokuapp.com/api/students/?populate=*'
    ).then ( res => {
      console.log(res)
      setStudents([...res.data.data]);
    })
  }, []);

  return (
    <>
    <div className={styles.container}>
      <Head>
        <title>Binar</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous"></link>
      </Head>
    </div>
    
        <div className="container">
            <div className="row justify-content-between align-items-center">
              <div className={styles.padding_top}>
                <center><h4 className={styles.text_style}>Home</h4></center>
                <hr />
                <div className={styles.container}>
                { students.map( (student) => {
                  return (
                    <>
                      <div key={student.id} className={`card ${styles['card']}`} >
                      { student.attributes.photo.data !== null &&
                        <Zoom><img src={student.attributes.photo.data.attributes.url} className="card-img-top" width="200" /></Zoom>
                      }
                        <div className="card-body">
                          <center><h4 className={`card-title ${styles['card_title']} ${styles['text_title']}`}>Data Form</h4></center>
                          <h5 className={styles.text_student}>First Name : {student.attributes.firstname}</h5>
                          <h5 className={styles.text_student}>Last Name : {student.attributes.lastname}</h5>
                          <h5 className={styles.text_student}>Location : {student.attributes.location}</h5>
                          <div className="d-grid gap-2 d-md-flex mt-4 mb-2 justify-content-md-end">
                            <button onClick={() => router.push(`/students/${student.id}`)} key={student.id} className="btn btn-dark">See detail</button>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })}
                </div>
              </div>
            </div>
        </div>
        </>
  )
}
