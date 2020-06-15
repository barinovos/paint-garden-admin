import styled from 'styled-components'
export const ProjectsWrapper = styled.div`
`
export const ProjectsList = styled.div`
    margin: 20px;
`

export const ProjectSidebar = styled.div`
    width: 20vw;
    height: 100vh;
    border-right: 1px solid #EAEAEA;
    display:inline-block;
    padding-left: 20px;
    padding-top: 20px;
`

export const CanvasArea = styled.div`
    width: 80vw;
    display:inline-block;
    vertical-align: top;
`

export const ProjectListing = styled.div`
    font-family: Spartan SemiBold;
    font-size: 12px;
    line-height: 13px;
    color: #000000;
    padding: 15px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${props => props.active && 
        'background-color: #F0F3F4;'
    }
`

export const CreateCanvas = styled.div`
    background-color: #4DA1FF;
    border-radius: 3px;
    display: inline-block;
    width: 220px;
    padding: 100px 0;
    color: #fff;
    text-align: center;
    font-weight: 600;
    font-size: 15px;
    line-height: 20px;
    color: #FFFFFF;
    margin: 20px 30px;
    cursor: pointer;
`

export const Title = styled.span `
    font-family: Spartan SemiBold;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 17px;
    color: #202020;
`

export const CreateButton = styled.button `
    border: 1px solid #000000;
    box-sizing: border-box;
    border-radius: 4px;
    background-color: #fff;
    padding: 10px 30px;
    margin-left: 30px;
    cursor: pointer;
`

export const ProjectTitle = styled.div`
    display: inline-block;
    font-family: Spartan;
    font-style: normal;
    font-weight: 800;
    font-size: 17px;
    line-height: 19px;
    margin: 0 0 0 40px;
    color: #202020;
    text-decoration: underline;
`

export const ProjectsTopBar = styled.div`
    display: flex;
    justify-content: space-between;
`
export const ProjectBarRight = styled.div`
`
export const CanvasesWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`



export const InviteButton = styled.div`
    border: 1px solid #4DA1FF;
    box-sizing: border-box;
    border-radius: 4px;
    color: #4DA1FF;
    padding: 10px 30px;
    display: inline-block;
`
