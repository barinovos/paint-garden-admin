import styled from 'styled-components'

export const ProjectSidebar = styled.div`
  width: 20vw;
  height: 100vh;
  border-right: 1px solid #eaeaea;
  display: inline-block;
  padding-left: 20px;
  padding-top: 20px;
`

export const CanvasArea = styled.div`
  width: 80vw;
  display: inline-block;
  vertical-align: top;
  padding-bottom: 36px;
`

export const ProjectListing = styled.div`
  font-family: Spartan SemiBold, sans-serif;
  font-size: 12px;
  line-height: 13px;
  color: #000000;
  padding: 15px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 62px;

  ${props => props.active && 'background-color: #F0F3F4;'}
`

export const CreateCanvas = styled.div`
  background-color: #4da1ff;
  border-radius: 3px;
  display: inline-block;
  width: 220px;
  height: 220px;
  padding: 100px 0;
  text-align: center;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  color: #ffffff;
  margin-right: 36px;
  margin-bottom: 36px;
  cursor: pointer;
`

export const Title = styled.span`
  font-family: Spartan SemiBold, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 17px;
  color: #202020;
  padding: 10px;
`

export const CreateButton = styled.button`
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: #fff;
  padding: 10px 30px;
  margin-left: 30px;
  cursor: pointer;
  margin-right: 10px;
`

export const ProjectTitle = styled.div`
  display: inline-block;
  font-family: Spartan, sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 17px;
  line-height: 19px;
  color: #202020;
  text-decoration: underline;
`

export const ProjectsTopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 36px 36px 0;
`

export const ProjectBarRight = styled.div``

export const CanvasesWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

export const InviteButton = styled.div`
  border: 1px solid #4da1ff;
  box-sizing: border-box;
  border-radius: 4px;
  color: #4da1ff;
  padding: 10px 30px;
  display: inline-block;
  cursor: pointer;
`
export const ProjectSidebarControls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.7em;
`

export const OtherProjects = styled.div`
  width: 100%;
  border-top: 1px solid #d8dfe5;
  padding: 20px 0 0 36px;
`

export const MyProjects = styled.div`
  width: 100%;
  padding: 24px 0 0 36px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`
