import TextBox from "./components/TextBox"
import Arrows from "./components/Arrows"
import Button from "./components/Buttons"
import Modal from "./components/Modal"
import { useEffect, useState } from "react"
import axios from 'axios'

const App = () => {
  const [showModal, setShowModal] = useState(null)
  const [inputLanguage, setInputLanguage] = useState('English')
  const [outputLanguage, setOutputLanguage] = useState('Polish')
  const [ languages, setLanguages ] = useState(null)
  const [ textToTranslate, setTextToTranslate ] = useState('')
  const [ translatedText, setTranslatedText ] = useState('')

  console.log('inputLanguage')

  const getLanguages = async () => {
    const response = await axios('http://localhost:8000/languages')
    setLanguages(response.data)
  }

  const translate = async () => {
    const data = {
      textToTranslate, outputLanguage, inputLanguage
    }
    const response = await axios('http://localhost:8000/translation', {
      params: data
    })
    setTranslatedText(response.data)
  }
  
  console.log('translated', translatedText)

  useEffect(() => {
    getLanguages()
  }, [])

  const handleClick = () => {
    setInputLanguage(outputLanguage)
    setOutputLanguage(inputLanguage)
  }

  console.log('showModal', showModal)
  return (
    <div className="app">
      {!showModal && <>
        <TextBox
          selectedLanguage={inputLanguage} 
          style='input'
          setShowModal={setShowModal}
          textToTranslate={textToTranslate}
          setTextToTranslate={setTextToTranslate}
        />

        <div className="arrow-container" onClick={handleClick}>
          <Arrows/>
        </div>

        <TextBox
          selectedLanguage={outputLanguage}
          style='output'
          setShowModal={setShowModal}
          translatedText={translatedText}
        />
        <div className="button-container" onClick={translate}>
          <Button/>
        </div>
      </>}

      {showModal && 
      <Modal 
        setShowModal={setShowModal}
        languages={languages}
        chosenLanguage={showModal === 'input' ? inputLanguage : outputLanguage}
        setChosenLanguage={showModal === 'input' ? setInputLanguage : setOutputLanguage}
      />}
    </div>
  )
}

export default App
