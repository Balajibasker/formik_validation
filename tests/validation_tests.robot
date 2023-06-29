*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}                http://www.google.com
${BROWSER}            Chrome
${CHROMEDRIVER PATH}  C:\\Users\\kryon\\OneDrive\\Desktop\\driver\\chromedriver.exe

*** Test Cases ***
Example Test
    Open Browser    ${URL}    ${BROWSER}    executable_path=${CHROMEDRIVER PATH}    timeout=10s
    
    Title Should Be    Example Domain
    Page Should Contain    Welcome to Example Domain
    Close Browser
