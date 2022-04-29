import SelectDropDown from "./SelectDropDown"

const TextBox = ({ 
    style, 
    selectedLanguage, 
    setShowModal, 
    setTextToTranslate, 
    textToTranslate, 
    translatedText, 
    setTranslatedText 
}) => {

    const handleClick = () => {
        setTextToTranslate('')
        setTranslatedText('')
    }

    return (
        <div className={style}>
            <SelectDropDown
                style={style}
                setShowModal={setShowModal}
                selectedLanguage={selectedLanguage}
            />
            <textarea
                placeholder={style == 'input' ? 'Enter Text' : 'Translation'}
                disabled={style == 'output'}
                onChange={(e) => setTextToTranslate(e.target.value)}
                value={style == 'input' ? textToTranslate : translatedText}
            />
            { style == 'input' && (
                <div className="delete" onClick={handleClick}>˟</div>
            )}
        </div>
    )
}

export default TextBox