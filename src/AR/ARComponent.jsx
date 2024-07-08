import { NavLink } from "react-router-dom";
import { AR } from "./AR";
import "./AR.css";
import { useState, useEffect } from "react";
import LandscapePopupComponent from "../LandscapePopupComponent";
/**
 * ARComponent represents the main page where the AR experience takes place.
 */
const ARComponent = () => {
  const { showPopup, filesLinks } = AR();

  return (
    <>
      {showPopup && <LandscapePopupComponent />}
      <a-scene
        embedded
        vr-mode-ui="enabled: false"
        renderer="antialias: false; logarithmicDepthBuffer:true"
        arjs="sourceType: webcam; patternRatio: 0.75; debugUIEnabled: true;"
      >
        {/* Asset Manager */}
        <a-assets>
          <img id="linkIcon" src="/images/externalLink.svg"></img>
          <img id="pauseIcon" src="/images/pause.svg"></img>
          <img id="playIcon" src="/images/play.svg"></img>
          <img id="returnIcon" src="/images/return.svg"></img>
          {/* Mixins allow the definition of reusable properties that can be used to easily add effects across objects */}
          <a-mixin id="giant" scale="5 5 5"></a-mixin>
        </a-assets>
        {console.log(filesLinks)}

        {/* Center Marker */}
        <a-marker
          type="pattern"
          url="src/assets/pattern/logo.patt"
          id="centerMarker"
        >
          {/* <a-box scale="0.01 0.1 2" material="color: pink; opacity: 0.1;" />
          <a-box scale="2 0.1 0.01" material="color: pink; opacity: 0.1;" /> */}
          {/* Left Panel - Buttons */}
          <a-entity id="leftPanel">
            <a-plane
              gltf-model="src/assets/door/left/DoorV5LeftPanel.glb"
              position="-0.7 -0.1 -0.25"
              rotation="90 0 0"
              scale="0.5 0.5 0.5"
            />
            <a-plane
              gltf-model="src/assets/door/left/DoorV5LeftPanelFrame.glb"
              position="-0.7 -0.1 -0.25"
              rotation="90 0 0"
              scale="0.5 0.5 0.5"
            />
            <a-box
              id="left-line-divider"
              visible="false"
              position="-0.8 0.01 -0.27"
              scale="0.015 0.05 0.4"
              rotation="0 90 0"
              material="color: #1A1A1A; opacity: 1;"
            />

            {[...Array(12).keys()].map((i) => (
              <a-entity key={i + 1}>
                <a-plane
                  id={`frame-ID-${i + 1}`}
                  gltf-model="src/assets/door/ButtonFrame.glb"
                  position={`${
                    i % 6 < 3 ? -0.95 + (i % 3) * 0.15 : 0.65 + (i % 3) * 0.15
                  }  0 ${-0.45 - Math.floor(i / 6) * -0.2}`}
                  rotation="0 0 0"
                  scale="0.105 0.105 0.105"
                ></a-plane>
                <a-plane
                  id={`ID-${i + 1}`}
                  class="clickable"
                  emitevents="true"
                  position={`${
                    i % 6 < 3 ? -0.95 + (i % 3) * 0.15 : 0.65 + (i % 3) * 0.15
                  }  0 ${-0.45 - Math.floor(i / 6) * -0.2}`}
                  scale="0.108 0.108 1"
                  rotation="-90 0 0"
                  material="color: #FFC904; opacity: 0.6;"
                >
                  <a-troika-text
                    id={`text-${i + 1}`}
                    position="0 0.05 0.01"
                    scale="2 3.33 1"
                    value={`${String(i + 1).padStart(3, "0")}`}
                    color="black"
                    width="2"
                    align="center"
                    wrapCount="15"
                    font-size="0.2"
                    font="src/assets/fonts/PixelDigivolveItalic.otf"
                  ></a-troika-text>
                </a-plane>
              </a-entity>
            ))}
            <a-entity>
              {/* <a-plane
                gltf-model="src/assets/door/left/DoorLeftPanelButtonFrame.glb"
                position="0.1 -0.25 1.4"
                rotation="0 0 0"
                scale="0.75 0.75 0.75"
              ></a-plane> */}
              <a-plane
                id="left-arrow-button"
                gltf-model="src/assets/door/left/DoorV5LeftPanelButton.glb"
                class=""
                visible="false"
                emitevents="true"
                position="-0.515 0 -0.32"
                rotation="-90 0 0"
                scale="0.49 0.49 0.49"
              />
              <a-plane
              id="left-arrow-container"
              gltf-model="src/assets/door/left/DoorV5LeftPanelArrowContainer.glb"
              visible="false"
              position="-0.51 0 -0.25"
              rotation="90 0 0"
              scale="0.4 0.4 0.2"
            />
              <a-plane
                id="left-arrow"
                gltf-model="src/assets/door/left/DoorV5LeftPanelButtonArrow.glb"
                visible="false"
                position="-0.49 0 -0.255"
                rotation="90 0 0"
                scale="0.5 0.5 0.2"
              ></a-plane>
            </a-entity>

            <a-entity
              id="previous-page"
              position="-0.78 0.1 -0.08"
              scale="0.2 0.1 0.12"
            >
              <a-plane
                id="previous-plane-frame"
                gltf-model="src/assets/door/ButtonFrame.glb"
                visible="false"
              ></a-plane>
              <a-plane
                id="previous-plane"
                class=""
                emitevents="true"
                rotation="-90 0 0"
                material="color: #FFC904; opacity: 0.5;"
                visible="false"
              >
                <a-troika-text
                  id="previous-text"
                  scale="2 3.33 1"
                  position="0 0 0.01"
                  value="Previous Page"
                  color="black"
                  font-size="0.1"
                  max-width="0.2"
                  line-height="1.2"
                  align="center"
                  font="src/assets/fonts/JoganSoft-Regular.ttf"
                ></a-troika-text>
              </a-plane>
            </a-entity>

            <a-entity id="menu" position="-0.68 -0.015 -0.02">
            <a-entity
              id="left-panel-menu-button"
              visible="false"
              class=""
              gltf-model="src/assets/door/left/DoorV5LeftPanelBottomButton.glb"
              scale="0.4 0.4 0.2"
              rotation="90 180 0"
            >
                <a-troika-text
                  id="left-panel-menu-text"
                  scale="1 1 1"
                  rotation="180 0 180"
                  position="0.3 0 -0.1"
                  value="Back to Menu"
                  color="black"
                  font-size="0.17"
                  max-width="2"
                  line-height="1.2"
                  align="center"
                  font="src/assets/fonts/JoganSoft-Regular.ttf"
                >
                  <a-image
                  src="#returnIcon"
                  position="0.6 0 0.1"
                  scale="0.1 0.1 0.1"
                  rotation="0 0 0"
                />
                </a-troika-text>
              </a-entity>
            </a-entity>
            <a-entity
              id="left-panel-labmember-info"
              position="-0.78 0 -0.5"
              rotation="-90 0 0"
              scale="0.1 0.1 0.1"
            >
              <a-box
                id="labMemberNumberBox"
                visible="false"
                position="0 0 0"
                scale="1.6 0.7 0.5"
                rotation="0 0 0"
                material="color: #191919; opacity: 1;"
              />
              <a-troika-text
                id="lab-member-number"
                value=""
                position="0 0 0.6"
                color="white"
                font-size="0.6"
                align="center"
                line-height="1"
                max-width="8"
                font="src/assets/fonts/PixelDigivolveItalic.otf"
              />
              <a-troika-text
                id="lab-member-name"
                value=""
                position="0 -0.9 0"
                color="white"
                font-size="0.6"
                align="center"
                line-height="1"
                max-width="8"
                font="src/assets/fonts/JoganSoft-Regular.ttf"
              />
              <a-troika-text
                id="lab-member-role"
                value=""
                position="0 -2 0"
                color="white"
                font-size="0.45"
                align="center"
                line-height="1"
                max-width="8"
                font="src/assets/fonts/JoganSoft-Regular.ttf"
              />
            </a-entity>
            <a-troika-text
              id="error-text"
              visible="false"
              position="0.1 0 11"
              rotation="0 90 180"
              scale="1 1 1"
              value="An error has occurred. Please contact VARLAB Adminstrators."
              color="red"
              max-width="4"
              line-height="1.2"
              font-size="0.4"
              align="center"
              wrapCount="15"
            ></a-troika-text>
          </a-entity>

          {/* Center Panel - Doors & Model */}
          <a-entity>
            <a-entity
                id="doormask"
                door-mask
                gltf-model="src/assets/door/DoorV5Mask.glb"
                position="-0.1 -0.09 0.46"
                scale="0.58 0.55 0.1"
                rotation="90 90 -90"
              />
            <a-entity
              id="doorframe"
              gltf-model="src/assets/door/center/DoorV5Frame.glb"
              position="0 -0.08 -0.18"
              scale="0.545 0.55 0.55"
              rotation="-90 -90 90"
            />
            <a-entity id="doors" position="0.09 0 0">
              <a-entity
                id="doorleft"
                data-raycastable
                gltf-model="src/assets/door/center/DoorV5Left.glb"
                position="0 -0.06 0.46"
                scale="0.55 0.55 0.55"
                rotation="-90 -90 90"
              ></a-entity>
              <a-entity
                id="doorright"
                data-raycastable
                gltf-model="src/assets/door/center/DoorV5Right.glb"
                position="0 -0.06 0.46"
                scale="0.55 0.55 0.55"
                rotation="-90 -90 90"
              ></a-entity>
            </a-entity>

            <a-entity
              id="centerEntity"
              position="0 -2 0"
              scale="0.2 0.2 0.2"
              rotation="-90 0 0"
            />
            {/* Virtual Room */}
            <a-entity
                id="room"
                name="virtualroom"
                position="0 -5.1 -0.59"
                scale="1 0.53 2"
                rotation="-90 0 0"
                virtual-hole
              >
                <a-troika-text
                  id="virtual-room-number"
                  position="-0.45 -1 0.06"
                  value=""
                  color="white"
                  font-size="0.5"
                  align="center"
                  line-height="1"
                  max-width="8"
                  font="src/assets/fonts/PixelDigivolveItalic.otf"
                />
                <a-box
              id="background"
              position="0 0 0"
              rotation="90 0 0"
              scale="4 0.1 4"
              material="color: black; opacity: 1;"
            />
              </a-entity>
              
          </a-entity>

          {/* Right Panel - Lab Member Details */}
          <a-entity>
            <a-entity
              id="next-page"
              position="0.8 0.1 -0.08"
              scale="0.2 0.1 0.12"
            >
              <a-plane
                id="next-plane-frame"
                gltf-model="src/assets/door/ButtonFrame.glb"
                rotation="0 90 0"
              ></a-plane>
              <a-plane
                id="next-plane"
                class="clickable"
                emitevents="true"
                rotation="-90 0 0"
                material="color: #FFC904; opacity: 0.5;"
              >
                <a-troika-text
                  id="next-text"
                  position="0 0 0.01"
                  scale="2 3 1"
                  value="Next Page"
                  color="black"
                  font-size="0.1"
                  max-width="0.2"
                  line-height="1.2"
                  align="center"
                  font="src/assets/fonts/JoganSoft-Regular.ttf"
                ></a-troika-text>
              </a-plane>
            </a-entity>
            <a-plane
              id="labMemberInfoPlane"
              gltf-model="src/assets/door/right/DoorV5RightPanel.glb"
              position="0.7 -0.1 -0.25"
              rotation="90 0 0"
              scale="0.5 0.5 0.5"
              visible="true"
            />
            <a-plane
              gltf-model="src/assets/door/right/DoorV5RightPanelFrame.glb"
              position="0.7 -0.07 -0.25"
              rotation="90 0 0"
              scale="0.5 0.5 0.5"
            />
            <a-plane
              id="right-arrow-button"
              gltf-model="src/assets/door/right/DoorV5RightPanelButton.glb"
              class=""
              visible="false"
              emitevents="true"
              position="0.53 0.01 -0.325"
              rotation="-90 0 0"
              scale="0.49 0.46 0.49"
            />
            <a-plane
              id="right-arrow-container"
              gltf-model="src/assets/door/right/DoorV5RightPanelArrowContainer.glb"
              visible="false"
              position="0.525 0 -0.255"
              rotation="90 0 0"
              scale="0.4 0.4 0.2"
            />
            <a-plane
              id="right-arrow"
              gltf-model="src/assets/door/right/DoorV5RightPanelButtonArrow.glb"
              visible="false"
              position="0.505 0 -0.25"
              rotation="90 0 0"
              scale="0.5 0.5 0.2"
            />
            <a-entity>
              <a-entity
                id="top-quotes"
                visible="false"
                gltf-model="src/assets/door/right/DoorRightPanelQuotes.glb"
                position="0.6 0.01 -0.5"
                rotation="0 180 0"
                scale="0.08 0.08 0.08"
              />
              <a-box
                id="right-note-box"
                visible="false"
                position="0.76 0.01 -0.1"
                scale="0.015 0.05 0.55"
                rotation="0 90 0"
                material="color: #121212; opacity: 1;"
              />
              <a-troika-text
                id="lab-member-note"
                value=""
                position="0.8 0.01 -0.33"
                scale="1 1 1"
                rotation="-90 0 0"
                color="white"
                font-size="0.035"
                align="center"
                line-height="1"
                max-width="0.35"
                font="src/assets/fonts/PixelDigivolveItalic.otf"
              />
              <a-entity
                id="bottom-quotes"
                visible="false"
                gltf-model="src/assets/door/right/DoorRightPanelQuotes.glb"
                position="1 0.01 -0.2"
                rotation="0 0 0"
                scale="0.08 0.08 0.08"
              />
            </a-entity>
            <a-entity
              id="right-panel-bottom-animation-button"
              visible="false"
              class=""
              gltf-model="src/assets/door/right/DoorV5RightPanelBottomButton.glb"
              position="0.7 0 -0.015"
              rotation="-90 0 0"
              scale="0.4 0.4 0.2"
            >
              <a-troika-text
                id="right-panel-bottom-animation-button-text"
                position="0.15 0 0.06"
                rotation="0 0 0"
                scale="1 1 1"
                value="Pause Animation"
                color="black"
                font-size="0.14"
                max-width="1"
                line-height="1.2"
                align="center"
                font="src/assets/fonts/JoganSoft-Regular.ttf"
              >
                <a-image
                  id="right-panel-bottom-animation-button-icon"
                  src="#pauseIcon"
                  position="0.6 0 0.1"
                  scale="0.1 0.1 0.1"
                  rotation="0 0 0"
                />
              </a-troika-text>
            </a-entity>
            <a-entity
              id="right-panel-bottom-link-button"
              visible="false"
              class=""
              gltf-model="src/assets/door/right/DoorV5RightPanelBottomButton.glb"
              position="0.7 0 -0.015"
              rotation="-90 0 0"
              scale="0.4 0.4 0.2"
            >
              <a-troika-text
                id="right-panel-bottom-link-button-learn-more-text"
                position="0.15 0 0.06"
                rotation="0 0 0"
                scale="1 1 1"
                value="Learn More"
                color="black"
                font-size="0.16"
                max-width="1"
                line-height="1.2"
                align="center"
                font="src/assets/fonts/JoganSoft-Regular.ttf"
              >
                <a-image
                  src="#linkIcon"
                  position="0.45 0 0.1"
                  scale="0.1 0.1 0.1"
                  rotation="0 0 0"
                />
              </a-troika-text>
            </a-entity>
            <a-entity
              id="right-panel-bottom-left-button"
              visible="false"
              class=""
              gltf-model="src/assets/door/right/DoorV5RightPanelBottomButtonLeft.glb"
              position="0.605 0 -0.015"
              rotation="-90 0 0"
              scale="0.4 0.4 0.2"
            >
              <a-troika-text
                id="right-panel-bottom-left-button-text"
                position="0.05 0.07 0.07"
                rotation="0 0 0"
                scale="1 1 1"
                value="Play Animation"
                color="black"
                font-size="0.1"
                max-width="1"
                line-height="1.2"
                align="center"
                font="src/assets/fonts/JoganSoft-Regular.ttf"
              >
                <a-image
                  id="right-panel-bottom-left-button-icon"
                  src="#pauseIcon"
                  position="0 -0.13 0.1"
                  scale="0.1 0.1 0.1"
                  rotation="0 0 0"
                />
              </a-troika-text>
            </a-entity>
            <a-entity
              id="right-panel-bottom-right-button"
              visible="false"
              class=""
              gltf-model="src/assets/door/right/DoorV5RightPanelBottomButtonRight.glb"
              position="0.915 0 -0.014"
              rotation="90 0 0"
              scale="0.4 0.4 0.2"
            >
              <a-troika-text
                id="right-panel-bottom-right-button-learn-more-text"
                position="0 -0.07 -0.07"
                rotation="180 0 0"
                scale="1 1 1"
                value="Learn More"
                color="black"
                font-size="0.1"
                max-width="0.5"
                line-height="1.2"
                align="center"
                font="src/assets/fonts/JoganSoft-Regular.ttf"
              >
                <a-image
                  src="#linkIcon"
                  position="0 -0.13 0.1"
                  scale="0.1 0.1 0.1"
                  rotation="0 0 0"
                />
              </a-troika-text>
            </a-entity>
          </a-entity>
          <a-entity
            id="smoke"
            rotation="180 0 0"
            position="0 -2.5 0.3"
            particle-system="
              enabled: false;
              preset: snow;
              texture: src/assets/effects/smoke4.png;
              size: 2.5;
              velocityValue: 0 1 0;
              velocitySpread: 2 0.5 0;
              positionSpread: 0.5 0 0.3;
              accelerationValue: 0 -0.1 0;
              accelerationSpread: 0 0 0;
              rotationAngleSpread: 0.1;
              maxAge: 5;
              particleCount: 5000;
              opacity: 0.003;
              blending: 2;"
          />
          <a-entity>
            <a-entity
              id="smokeblast-1"
              rotation="0 -10 90"
              position="-0.41 -0.08 0.2"
              particle-system="
                enabled: false;
                preset: snow;
                texture: src/assets/effects/smoke4.png;
                size: 0.5;
                velocityValue: 0 10 0;
                velocitySpread: 0 0 0;
                positionSpread: 0 0 0;
                accelerationValue: 0 10 0;
                accelerationSpread: 0 0 0;
                rotationAngleSpread: 0.3;
                maxAge: 0.035;
                particleCount: 3000;
                opacity: 0.003;
                blending: 2;"
            />
            <a-entity
              id="smokeblast-2"
              rotation="0 -10 90"
              position="-0.41 -0.08 -0.1"
              particle-system="
                enabled: false;
                preset: snow;
                texture: src/assets/effects/smoke4.png;
                size: 0.5;
                velocityValue: 0 10 0;
                velocitySpread: 0 0 0;
                positionSpread: 0 0 0;
                accelerationValue: 0 10 0;
                accelerationSpread: 0 0 0;
                rotationAngleSpread: 0.3;
                maxAge: 0.035;
                particleCount: 3000;
                opacity: 0.003;
                blending: 2;"
            />
            <a-entity
              id="smokeblast-3"
              rotation="0 -10 90"
              position="-0.41 -0.08 -0.4"
              particle-system="
                enabled: false;
                preset: snow;
                texture: src/assets/effects/smoke4.png;
                size: 0.5;
                velocityValue: 0 10 0;
                velocitySpread: 0 0 0;
                positionSpread: 0 0 0;
                accelerationValue: 0 10 0;
                accelerationSpread: 0 0 0;
                rotationAngleSpread: 0.3;
                maxAge: 0.035;
                particleCount: 3000;
                opacity: 0.003;
                blending: 2;"
            />
            <a-entity
              id="smokeblast-4"
              rotation="0 10 -90"
              position="0.41 -0.08 0.2"
              particle-system="
                enabled: false;
                preset: snow;
                texture: src/assets/effects/smoke4.png;
                size: 0.5;
                velocityValue: 0 10 0;
                velocitySpread: 0 0 0;
                positionSpread: 0 0 0;
                accelerationValue: 0 10 0;
                accelerationSpread: 0 0 0;
                rotationAngleSpread: 0.3;
                maxAge: 0.035;
                particleCount: 3000;
                opacity: 0.003;
                blending: 2;"
            />
            <a-entity
              id="smokeblast-5"
              rotation="0 10 -90"
              position="0.41 -0.08 -0.1"
              particle-system="
                enabled: false;
                preset: snow;
                texture: src/assets/effects/smoke4.png;
                size: 0.5;
                velocityValue: 0 10 0;
                velocitySpread: 0 0 0;
                positionSpread: 0 0 0;
                accelerationValue: 0 10 0;
                accelerationSpread: 0 0 0;
                rotationAngleSpread: 0.3;
                maxAge: 0.035;
                particleCount: 3000;
                opacity: 0.003;
                blending: 2;"
            />
            <a-entity
              id="smokeblast-6"
              rotation="0 10 -90"
              position="0.41 -0.08 -0.4"
              particle-system="
                enabled: false;
                preset: snow;
                texture: src/assets/effects/smoke4.png;
                size: 0.5;
                velocityValue: 0 10 0;
                velocitySpread: 0 0 0;
                positionSpread: 0 0 0;
                accelerationValue: 0 10 0;
                accelerationSpread: 0 0 0;
                rotationAngleSpread: 0.3;
                maxAge: 0.035;
                particleCount: 3000;
                opacity: 0.003;
                blending: 2;"
            />
          </a-entity>
          
        </a-marker>

        <a-camera
          position="0 0 0"
          cursor="fuse: false; rayOrigin:mouse;"
          raycaster="objects:.clickable"
          look-controls="enabled: false"
          click-listener
        ></a-camera>
      </a-scene>
    </>
  );
};

export default ARComponent;
