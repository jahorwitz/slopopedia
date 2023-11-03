
import { PageTitle, Header, PreferencesSidebar, PreferencesHorizontalMenu, Button, Footer } from "./index";
import {useEffect, useState} from 'react';

export const Preferences = () => {

    

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
        <div className="flex flex-row mt-10 ">
            <div className=" xs:hidden sm:hidden md:block lg:block xl:block">
                <PreferencesSidebar />
            </div>
            <div className="flex flex-col pl-36">
                <PageTitle title="SLOP PREFERENCES" className=" font-arialBold text-lg scale-y-[2.0]" />
                <div className="min-w-[600px]  mt-10 ">
                    {/*insert Advanced Form Here*/}
                </div>
            </div>
            <Button title="Save" className="bg-yellow-button w-56 h-12 font-arialBold ml-32 mt-[696px] text-lg mr-10"/>
        </div>
        )
    }

    const horizontalmenu = () => {
        return (
            <div>
                <div> 
                    <PreferencesHorizontalMenu />
                </div>
                <div className="flex flex-col pt-12 justify-center  pl-2">
                    <PageTitle title="SLOP PREFERENCES" className="sm:text-md xs:text-sm font-arialBold text-lg scale-y-[2.0]  " />
                    <div className=" mt-10 ml-2 mr-12 xs:mr-12">
                        {/*insert Advanced Form Here*/}
                    </div>
                    <Button title="Save" className=" bg-yellow-button w-56 h-12 font-arialBold  mt-12 text-lg "/>    
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