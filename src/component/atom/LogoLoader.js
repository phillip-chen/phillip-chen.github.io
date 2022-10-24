import React from 'react';

class LogoLoader extends React.Component{
    constructor(props){
        super(props);
    }

    render(){

        return(
            <>
                {/* svg based logo animation for init page load */}
                <svg id='init-animation-logo' className={this.props.className} width="250" height="249" viewBox="0 0 250 249" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className="outline stroke-light-secondary dark:stroke-dark-secondary" d="M205.925 35.4141C229.945 57.3441 245.015 88.9141 245.015 124.014C245.015 159.114 229.795 191.014 205.555 212.954" strokeWidth="8" strokeMiterlimit="10"/>
                    <path className="outline stroke-light-secondary dark:stroke-dark-secondary" d="M190.354 50.9766C210.404 68.9166 223.014 94.9966 223.014 124.017C223.014 153.037 210.244 179.437 189.984 197.387" strokeWidth="8" strokeMiterlimit="10"/>
                    <path className="t-letter letter-ele stroke-light-secondary dark:stroke-dark-secondary" d="M104.935 67.4141H139.975H180.345" stroke="#201E5A" strokeWidth="10" strokeMiterlimit="10"/>
                    <path className="t-letter letter-ele stroke-light-secondary dark:stroke-dark-secondary" d="M142.645 67.4141V182.904" stroke="#201E5A" strokeWidth="10" strokeMiterlimit="10"/>
                    <path className="y-letter letter-ele stroke-light-secondary dark:stroke-dark-secondary" d="M120.104 77.0703V98.9003C120.104 102.74 123.424 105.86 127.514 105.86H162.715" stroke="#201E5A" strokeWidth="10" strokeMiterlimit="10"/>
                    <path className="y-letter letter-ele stroke-light-secondary dark:stroke-dark-secondary" d="M165.505 77.0703V127.6C165.505 132.24 161.625 136 156.835 136H118.215" stroke="#201E5A" strokeWidth="10" strokeMiterlimit="10"/>
                    <path className="p-letter letter-ele stroke-light-secondary dark:stroke-dark-secondary" d="M79.9046 117.901H88.4846C90.6146 117.901 92.3446 116.141 92.3446 113.961V70.2106C92.3446 67.4106 90.1146 65.1406 87.3646 65.1406H74.6046C71.8946 65.1406 69.6846 67.3806 69.6846 70.1506V182.901" stroke="#201E5A" strokeWidth="10" strokeMiterlimit="10"/>
                    <path className="n-letter letter-ele stroke-light-secondary dark:stroke-dark-secondary" d="M114.614 182.897V164.017C114.614 161.037 117.444 158.617 120.944 158.617H163.734C167.224 158.617 170.064 161.037 170.064 164.017V182.897" stroke="#201E5A" strokeWidth="10" strokeMiterlimit="10"/>
                    <path className="c-letter stroke-light-secondary dark:stroke-dark-secondary" d="M202.045 201.168C168.065 235.148 114.325 243.608 70.6746 218.508C18.4946 188.498 0.514558 121.868 30.5346 69.6776C60.5446 17.4976 127.175 -0.48241 179.365 29.5276C187.845 34.4076 195.425 40.2576 202.045 46.8676" stroke="#201E5A" strokeWidth="30" strokeLinejoin="round"/>
                </svg>
            </>
        );
    }
}

export default LogoLoader;