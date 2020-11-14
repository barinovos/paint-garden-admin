import styled from 'styled-components'
import colors from '../constants/colors'

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

export const Wrapper = styled.div`
  margin-right: 36px;
  margin-bottom: 36px;
  text-align: center;
  width: 220px;
  height: 220px;
  display: inline-flex;
  flex-direction: column;
  position: relative;
`

export const CanvasesTitle = styled.div`
  font-family: Spartan SemiBold, sans-serif;
  font-style: normal;
  font-weight: normal;
  display: block;
  font-size: 12px;
  line-height: 16px;
  color: #000000;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const UserName = styled.div`
  font-size: 10px;
  line-height: 14px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const ImageWrapper = styled.div`
  display: block;
  position: relative;
  height: 100%;
`

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: 0.5s ease;
  background-color: rgba(${colors.rgbaGray});
  ${ImageWrapper}:hover & {
    opacity: 1;
  }
`

export const Icons = styled.div`
  position: absolute;
  display: none;
  top: 0;
  right: 15px;
  padding-top: 4px;
  padding-left: 7px;
  transform: translateY(-26px);
  transition: transform ease-in 0.3s;

  ${ImageWrapper}:hover & {
    display: block;
    transform: translateY(0px);
  }
`

export const InfoOverlay = styled.div`
  text-align: left;
  position: absolute;
  bottom: 0;
  padding: 10px 12px;
  width: 100%;
  background-color: rgba(77, 161, 255, 0.6);
`

export const ModalWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
export const ModalContentWrapper = styled.form`
  width: 450px;
  background: white;
  box-shadow: 2px 3px 22px rgba(0, 0, 0, 0.5);
  border-radius: 2px;
  padding: 18px 21px;
`

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const ErrorText = styled.div`
  color: red;
  font-size: 12px;
`
