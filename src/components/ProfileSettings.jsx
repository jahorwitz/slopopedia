import { Header, ProfileSidebar, Footer, ProfileHorizontalMenu } from "./index";
import {useEffect, useState} from 'react';

export const ProfileSettings = () => {

    const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
        setScreenSize(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  const sidebar = () => {
    return (
      <div className="flex flex-row mt-10">
        <div className="mr-32 ml-5 ">
          <ProfileSidebar />
        </div>
        {/*insert form component here*/}
      </div>
    )
  }

  const horizontalmenu = () => {
    return (
      <div>
          <ProfileHorizontalMenu />
          <div className="mt-8 ml-5">
            {/*insert form component here*/}
          </div>
      </div>
    )
  }

    return (
        <div className="max-w-[1440px] min-h-[1023px] bg-gray-background mx-auto">
            <Header>
                <Header.Logo />
                <Header.NavLinks />
                <Header.Profile />
            </Header>
            {screenSize < 1170 ? (horizontalmenu()) : (sidebar())}
            <div className="mt-32">
              <Footer >
                <Footer.Content />
              </Footer>
            </div>
        </div>
        
        
    )
}