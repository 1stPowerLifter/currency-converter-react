import { Box } from "utils/Box"
import { useEffect, useState } from "react"
import { ConverterTool } from "components/ConverterTool/ConverterTool"
import { Title } from "./Converter.styled"


export const Converter = ({ title, currency }) => {

    const [leftValue, setLeftValue] = useState(0)
    const [rigteValue, setRightValue] = useState(0)
    const [leftCurrency, setLeftCurrency] = useState()
    const [rigteCurrency, setRightCurrency] = useState()
    const [isSelected, setIsSelected] = useState(false)
    const [leftClick, setLeftClick] = useState(false)
    const [rightClick, setRightClick] = useState(false)

    
    const optionsUpdate = () => {
        const keys = Object.keys(currency)
        const values = Object.values(currency)
        const options = []
        for (let i = 0; i < keys.length; i += 1) {
            options.push({ value: values[i], label: keys[i] })
        }
        return options
    }
    const options = optionsUpdate()

    useEffect(() => {
        if (rigteCurrency && leftCurrency) { setIsSelected(true) }
    }, [leftCurrency, rigteCurrency])

    useEffect(() => {
        if (isSelected && leftClick) {
            setRightValue((leftValue / leftCurrency * rigteCurrency).toFixed(3))
            setLeftClick(false)
        }

    }, [isSelected, leftClick, leftCurrency, leftValue, rigteCurrency])
    
    useEffect(() => {
        if (isSelected && rightClick) {
            setLeftValue((rigteValue / rigteCurrency * leftCurrency).toFixed(3))
            setRightClick(false)
        }
       
    }, [isSelected, leftClick, leftCurrency, rightClick, rigteCurrency, rigteValue])

    return (
        <Box display="flex"
            flexDirection="column"
            py="64px"
            bg="#f6f6f6"
            minHeight="calc(100vh - 77px);"
        >
            <Title>{title}</Title>
            <Box display="flex"
                px="16px"
                justifyContent="space-between"
                gridGap="32px"
                m="0 auto"
            >
                <ConverterTool
                    selectTool={setLeftClick}
                    inputValue={leftValue}
                    disabled={!isSelected}
                    inputChanger={setLeftValue}
                    options={options}
                    selectChanger={setLeftCurrency}
                />
                <ConverterTool
                    selectTool={setRightClick}
                    inputValue={rigteValue}
                    disabled={!isSelected}
                    inputChanger={setRightValue}
                    options={options}
                    selectChanger={setRightCurrency}
                />
            </Box>
        </Box>
    )
}

