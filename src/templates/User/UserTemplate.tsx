import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'

type Props = {}

export default function UserTemplate({}: Props) {
  return (
    <>
        <Header/>
        <Outlet/>
        <Footer/>
    </>
  )
}