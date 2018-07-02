import React from 'react';
import '../CSS/primary.css';
import { Button, Image, Icon, Label, Header, Modal } from 'semantic-ui-react';

var fileDir = [
    { fileName: './50images/n01592084_9.JPEG', id: "n01592084" },
    { fileName: './50images/n01641577_150.JPEG', id: "n01641577" },
    { fileName: './50images/n01687978_71.JPEG', id: "n01687978" },
    { fileName: './50images/n01688243_225.JPEG', id: "n01688243" },
    { fileName: './50images/n01698640_254.JPEG', id: "n01698640" },
    { fileName: './50images/n01742172_42.JPEG', id: "n01742172" },
    { fileName: './50images/n01774750_17.JPEG', id: "n01774750" },
    { fileName: './50images/n01833805_80.JPEG', id: "n01833805" },
    { fileName: './50images/n01847000_573.JPEG', id: "n01847000" },
    { fileName: './50images/n01877812_245.JPEG', id: "n01877812" },
    { fileName: './50images/n02017213_86.JPEG', id: "n02017213" },
    { fileName: './50images/n02086646_4485.JPEG', id: "n02086646" },
    { fileName: './50images/n02092002_18312.JPEG', id: "n02092002" },
    { fileName: './50images/n02093859_3848.JPEG', id: "n02093859" },
    { fileName: './50images/n02099601_7873.JPEG', id: "n02099601" },
    { fileName: './50images/n02109525_21208.JPEG', id: "n02109525" },
    { fileName: './50images/n02123394_112.JPEG', id: "n02123394" },
    { fileName: './50images/n02167151_147.JPEG', id: "n02167151" },
    { fileName: './50images/n02172182_149.JPEG', id: "n02172182" },
    { fileName: './50images/n02226429_341.JPEG', id: "n02226429" },
    { fileName: './50images/n02259212_221.JPEG', id: "n02259212" },
    { fileName: './50images/n02325366_108.JPEG', id: "n02325366" },
    { fileName: './50images/n02361337_2.JPEG', id: "n02361337" },
    { fileName: './50images/n02364673_59.JPEG', id: "n02364673" },
    { fileName: './50images/n02454379_114.JPEG', id: "n02454379" },
    { fileName: './50images/n02782093_173.JPEG', id: "n02782093" },
    { fileName: './50images/n02814860_178.JPEG', id: "n02814860" },
    { fileName: './50images/n02883205_169.JPEG', id: "n02883205" },
    { fileName: './50images/n02894605_938.JPEG', id: "n02894605" },
    { fileName: './50images/n02951585_474.JPEG', id: "n02951585" },
    { fileName: './50images/n03028079_603.JPEG', id: "n03028079" },
    { fileName: './50images/n03124043_111.JPEG', id: "n03124043" },
    { fileName: './50images/n03197337_193.JPEG', id: "n03197337" },
    { fileName: './50images/n03240683_283.JPEG', id: "n03240683" },
    { fileName: './50images/n03345487_360.JPEG', id: "n03345487" },
    { fileName: './50images/n03447447_42.JPEG', id: "n03447447" },
    { fileName: './50images/n03534580_557.JPEG', id: "n03534580" },
    { fileName: './50images/n03630383_76.JPEG', id: "n03630383" },
    { fileName: './50images/n03658185_36.JPEG', id: "n03658185" },
    { fileName: './50images/n03676483_596.JPEG', id: "n03676483" },
    { fileName: './50images/n03769881_12.JPEG', id: "n03769881" },
    { fileName: './50images/n03788195_759.JPEG', id: "n03788195" },
    { fileName: './50images/n03877845_848.JPEG', id: "n03877845" },
    { fileName: './50images/n03903868_5674.JPEG', id: "n03903868" },
    { fileName: './50images/n03977966_691.JPEG', id: "n03977966" },
    { fileName: './50images/n04118776_420.JPEG', id: "n04118776" },
    { fileName: './50images/n04258138_314.JPEG', id: "n04258138" },
    { fileName: './50images/n04367480_192.JPEG', id: "n04367480" },
    { fileName: './50images/n04442312_168.JPEG', id: "n04442312" },
    { fileName: './50images/n04525305_430.JPEG', id: "n04525305" },    
]    

var activeIndex = Math.floor(Math.random() * 50), usedImages = [activeIndex], taskDone = 1, flag;
var timeTaken = { minutes: 0, seconds: 0, milsec: 0 }, addTime = [0, 0, 0], avgTime = [], Interval;
var fileName = fileDir[activeIndex].fileName;

export class MainImages extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isopen: false,
            activeNext: false
        };
    }

    componentDidMount() {
        alert("* Please disable AdBlock and any other antivirus software before you begin!\n Make sure to \"Allow\" popups/cookies on this app! *");
        this.props.onRef(this)
    }

    updateButton() {
        this.state.activeNext ? this.setState({ activeNext: false }) : this.setState({ activeNext: true })
    }

    OnFinish() {
        //To find the Average time
        let td = taskDone - 1;
        avgTime[0] = addTime[0] / td;
        avgTime[1] = addTime[1] / td;
        avgTime[2] = addTime[2] / td;

        avgTime[1] += (avgTime[0] * 60) % 60;
        avgTime[2] += (avgTime[1] * 100) % 100;

        avgTime[0] = Math.floor(avgTime[0]);
        avgTime[1] = Math.floor(avgTime[1]);
        avgTime[2] = Math.floor(avgTime[2]);

        this.props.onFinish(addTime, avgTime);
    }

    startTimer() {
        timeTaken.milsec++;

        if (timeTaken.milsec > 99) {
            timeTaken.seconds++;
            timeTaken.milsec = 0;
        }

        if (timeTaken.seconds > 59) {
            timeTaken.minutes++;
            timeTaken.seconds = 0;
        }
    }

    startWatch() {
        Interval = setInterval(this.startTimer, 10);
    }

    changeImage() {
        //Pause the StopWatch
        clearInterval(Interval);
        this.updateButton();

        //To pass values to Parent (App.js);
        let t = timeTaken.minutes + ":" + timeTaken.seconds + ":" + timeTaken.milsec;
        this.props.onNextImage(fileDir[activeIndex].fileName, fileDir[activeIndex].id, t);

        //Add the time to find total time take
        addTime[2] += timeTaken.milsec;
        if (addTime[2] > 99) {
            addTime[1] += Math.floor(addTime[2] / 100);
            addTime[2] %= 100;
        }
        addTime[1] += timeTaken.seconds;
        if (addTime[1] > 59) {
            addTime[0] += Math.floor(addTime[1] / 60);
            addTime[1] %= 60;
        }
        addTime[0] += timeTaken.minutes;
        
        //Clear the StopWatch
        timeTaken.milsec = timeTaken.seconds = timeTaken.minutes = 0;

        //Load next image
        taskDone++;
        //Change here to lock the images
        if (taskDone > 50) {
            this.setState({
                isopen: true
            })
        }
        else
            do {
                flag = true;
                activeIndex = Math.floor(Math.random() * 50);

                for (var i = 0; i < usedImages.length; i++)
                    if (usedImages[i] === activeIndex)
                        flag = false;

                if (flag === true) {
                    usedImages.push(activeIndex);
                    fileName= fileDir[activeIndex].fileName;
                }
            } while (flag !== true);

        //Start the Watch
        this.startWatch();
    }

    render() {
        return (
            <div>
                <Image className="imageStyling" src={fileName} />

                <Label style={{ zIndex: "1", position: "fixed", top: "10px", right: '4vw' }} color="teal">
                    {taskDone}/50
                </Label>

                <div className="NextButton" style={{ width: '180px' }} >
                    {this.state.activeNext ?
                        <Button primary animated size='huge' onClick={this.changeImage.bind(this)}>
                            <Button.Content visible> Next Image </Button.Content>
                            <Button.Content hidden>
                                <Icon name='right arrow' />
                            </Button.Content>
                        </Button>
                        :
                        <Button disabled size='huge'>Next Image</Button>
                    }
                </div>

                <Modal open={this.state.isopen} basic dimmer="blurring" style={{ position: "fixed", width: "auto", marginTop: "30vh", marginLeft: "38vw" }}>
                    <Header icon='check square outline' style={{ textAlign: "center" }} content='Task Completed!' />
                    <Modal.Content>
                        <h2> Thank you for your participation! <br />
                            Please click on Finish. </h2>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='blue' inverted onClick={this.OnFinish.bind(this)}>
                            Finish
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}