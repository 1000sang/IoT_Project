import React, { Component } from "react";
import styled from "styled-components";
import BackgroundImg from '@iso/assets/images/IMG_2920_3.png';
import BackgroundImg_1 from '@iso/assets/images/IMG_2920_1_1.png';


class ConnectedLine extends Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.imgRef = React.createRef();
        this.menuRef = React.createRef();
    }

    componentDidMount() {
        this.updateCanvas();
    }

    componentWillUpdate() {
        this.updateCanvas();
    }

    updateCanvas() {
        const img = this.imgRef.current;
        const canvas = this.canvasRef.current;
        let can_w = canvas.width;
        let can_h = canvas.height;
        const ctx = canvas.getContext("2d");

        var ball = {
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            r: 0,
            alpha: 1,
            phase: 0
        },
            ball_color = {
                r: 207,
                g: 255,
                b: 4
            },
            R = 1.5,
            balls = [],
            alpha_f = 0.03,
            alpha_phase = 0,

            link_line_width = 0.8,
            dis_limit = (100 * window.innerWidth * window.innerHeight) / (1920 * 1021),
            add_mouse_point = true,
            mouse_in = false,
            mouse_ball = {
                x: 0,
                y: 0,
                vx: 0,
                vy: 0,
                r: 0,
                type: "mouse"
            };

        function getRandomSpeed(pos) {
            let min = -0.3,
                max = 0.3;

            switch (pos) {
                case "top":
                    return [randomNumFrom(min, max), randomNumFrom(0.1, max)];

                case "right":
                    return [randomNumFrom(min, -0.1), randomNumFrom(min, max)];

                case "bottom":
                    return [randomNumFrom(min, max), randomNumFrom(min, -0.1)];

                case "left":
                    return [randomNumFrom(0.1, max), randomNumFrom(min, max)];

                default:
                    return;
            }
        }

        function randomArrayItem(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }

        function randomNumFrom(min, max) {
            return Math.random() * (max - min) + min;
        }

        function getRandomBall() {
            let pos = randomArrayItem(["bottom", "right", "top", "left"]);
            switch (pos) {
                case "top":
                    return {
                        x: randomSidePos(can_w),
                        y: -R,
                        vx: getRandomSpeed("top")[0],
                        vy: getRandomSpeed("top")[1],
                        r: R,
                        alpha: 1,
                        phase: randomNumFrom(0, 10)
                    }

                case "right":
                    return {
                        x: can_w + R,
                        y: randomSidePos(can_h),
                        vx: getRandomSpeed("right")[0],
                        vy: getRandomSpeed("right")[1],
                        r: R,
                        alpha: 1,
                        phase: randomNumFrom(0, 10)
                    }

                case "bottom":
                    return {
                        x: randomSidePos(can_w),
                        y: can_h + R,
                        vx: getRandomSpeed("bottom")[0],
                        vy: getRandomSpeed("bottom")[1],
                        r: R,
                        alpha: 1,
                        phase: randomNumFrom(0, 10)
                    }

                case "left":
                    return {
                        x: -R,
                        y: randomSidePos(can_h),
                        vx: getRandomSpeed("left")[0],
                        vy: getRandomSpeed("left")[1],
                        r: R,
                        alpha: 1,
                        phase: randomNumFrom(0, 10)
                    }
            }
        }

        function randomSidePos(length) {
            return Math.ceil(Math.random() * length);
        }

        function renderBalls() {
            Array.prototype.forEach.call(balls, function (b) {
                if (!b.hasOwnProperty("type")) {
                    ctx.fillStyle = "rgba(" + ball_color.r + "," + ball_color.g + "," + ball_color.b + "," + b.alpha + ")";
                    ctx.beginPath();
                    ctx.arc(b.x, b.y, R, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.fill();
                }
            });
        }

        function updateBalls() {
            let new_balls = [];
            Array.prototype.forEach.call(balls, function (b) {
                b.x += b.vx;
                b.y += b.vy;

                if (b.x > -(5) && b.x < (can_w + 5) && b.y > -(5) && b.y < (can_h + 5)) {
                    new_balls.push(b);
                }

                b.phase += alpha_f;
                b.alpha = Math.abs(Math.cos(b.phase));
            });

            balls = new_balls.slice(0);
        }

        function loopAlphaInf() {

        }

        function renderLines() {
            let fraction, alpha;
            for (let i = 0; i < balls.length; i++) {
                for (var j = i + 1; j < balls.length; j++) {
                    fraction = getDisOf(balls[i], balls[j]) / dis_limit;

                    if (fraction < 1) {
                        alpha = (1 - fraction).toString();

                        ctx.strokeStyle = "rgba(150,150,150," + alpha + ")";
                        ctx.lineWidth = link_line_width;

                        ctx.beginPath();
                        ctx.moveTo(balls[i].x, balls[i].y);
                        ctx.lineTo(balls[j].x, balls[j].y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
        }

        function getDisOf(b1, b2) {
            let delta_x = Math.abs(b1.x - b2.x),
                delta_y = Math.abs(b1.y - b2.y);

            return Math.sqrt(delta_x * delta_x + delta_y * delta_y);
        }

        function addBallIfy() {
            if (balls.length < 20) {
                balls.push(getRandomBall());
            }
        }

        function rendering() {
            ctx.clearRect(0, 0, can_w, can_h);

            renderBalls();
            renderLines();
            updateBalls();
            addBallIfy();

            window.requestAnimationFrame(rendering);
        }

        function initBalls(num) {
            for (let i = 1; i <= num; i++) {
                balls.push({
                    x: randomSidePos(can_w),
                    y: randomSidePos(can_h),
                    vx: getRandomSpeed("top")[0],
                    vy: getRandomSpeed("top")[1],
                    r: R,
                    alpha: 1,
                    phase: randomNumFrom(0, 10)
                });
            }
        }

        function initCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            can_w = canvas.width;
            can_h = canvas.height;
        }

        window.addEventListener("resize", function (e) {
            console.log("window resize...");
            initCanvas();
        });

        function goMovie() {
            initCanvas();
            initBalls((window.innerWidth * window.innerHeight) / 1000000);
            window.requestAnimationFrame(rendering);
        }
        goMovie();

        img.addEventListener("mouseenter", function () {
            mouse_in = true;
            balls.push(mouse_ball);
        });
        img.addEventListener("mouseleave", function () {
            mouse_in = false;
            var new_balls = [];
            Array.prototype.forEach.call(balls, function (b) {
                if (!b.hasOwnProperty("type")) {
                    new_balls.push(b);
                }
            });
            balls = new_balls.slice(0);
        });
        img.addEventListener("mousemove", function (e) {
            var e = e || window.event;
            mouse_ball.x = e.pageX;
            mouse_ball.y = e.pageY;
        });

    }

    render() {
        return (
            <Container>
                <Canvas ref={this.canvasRef} className="ConnectedLine" width="350" height="700" />
                <Background ref={this.imgRef} />
            </Container>
        );
    }
}

const Container = styled.div`
    position : relative;   
`;
const Div = styled.div`
    position:relative;
`;

const Canvas = styled.canvas`
    // position:absolute;
    // height: 100vh;
    // width: 100%;
    // background: radial-gradient(
    // ellipse at 60% 120%,
    // rgba(20,20,20,0.4) 10%,
    // rgba(20,0,0,0.6) 40%,
    // rgba(20,20,20,1) 80%
    // );
    // background-color : #0f4c81;

    position:absolute;
    top : 0;
    left : 0;
    width:100%;
    height:100vh;
    background-image:url(${BackgroundImg_1});
    background-size:cover;
    background-position: center center;
    background-repeat: no-repeat;
`;

const Background = styled.img`
    position:absolute;
    top : 0;
    left : 0;
    width:100%;
    height:100vh;
    background-image:url(${BackgroundImg});
    background-size:cover;
    background-position: center center;
    background-repeat: no-repeat;
`;

export default ConnectedLine;