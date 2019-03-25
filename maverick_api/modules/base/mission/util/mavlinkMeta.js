mavlinkEnumToString (enumValue, enumGroup) {
  const mavlinkEnums = {
    ACCELCAL_VEHICLE_POS: {
      1: {
        name: "LEVEL",
        description: "",
        param: {}
      },
      2: {
        name: "LEFT",
        description: "",
        param: {}
      },
      3: {
        name: "RIGHT",
        description: "",
        param: {}
      },
      4: {
        name: "NOSEDOWN",
        description: "",
        param: {}
      },
      5: {
        name: "NOSEUP",
        description: "",
        param: {}
      },
      6: {
        name: "BACK",
        description: "",
        param: {}
      },
      16777215: {
        name: "SUCCESS",
        description: "",
        param: {}
      },
      16777216: {
        name: "FAILED",
        description: "",
        param: {}
      }
    },
    MAV_CMD: {
      16: {
        name: "NAV_WAYPOINT",
        description: "Navigate to waypoint.",
        param: {
          1: "Hold time in decimal seconds. (ignored by fixed wing, time to stay at waypoint for rotary wing)",
          2: "Acceptance radius in meters (if the sphere with this radius is hit, the waypoint counts as reached)",
          3: "0 to pass through the WP, if > 0 radius in meters to pass by WP. Positive value for clockwise orbit, negative value for counter-clockwise orbit. Allows trajectory control.",
          4: "Desired yaw angle at waypoint (rotary wing). NaN for unchanged.",
          5: "Latitude",
          6: "Longitude",
          7: "Altitude"
        }
      },
      17: {
        name: "NAV_LOITER_UNLIM",
        description: "Loiter around this waypoint an unlimited amount of time",
        param: {
          1: "Empty",
          2: "Empty",
          3: "Radius around waypoint, in meters. If positive loiter clockwise, else counter-clockwise",
          4: "Desired yaw angle.",
          5: "Latitude",
          6: "Longitude",
          7: "Altitude"
        }
      },
      18: {
        name: "NAV_LOITER_TURNS",
        description: "Loiter around this waypoint for X turns",
        param: {
          1: "Turns",
          2: "Empty",
          3: "Radius around waypoint, in meters. If positive loiter clockwise, else counter-clockwise",
          4: "Forward moving aircraft this sets exit xtrack location: 0 for center of loiter wp, 1 for exit location. Else, this is desired yaw angle",
          5: "Latitude",
          6: "Longitude",
          7: "Altitude"
        }
      },
      19: {
        name: "NAV_LOITER_TIME",
        description: "Loiter around this waypoint for X seconds",
        param: {
          1: "Seconds (decimal)",
          2: "Empty",
          3: "Radius around waypoint, in meters. If positive loiter clockwise, else counter-clockwise",
          4: "Forward moving aircraft this sets exit xtrack location: 0 for center of loiter wp, 1 for exit location. Else, this is desired yaw angle",
          5: "Latitude",
          6: "Longitude",
          7: "Altitude"
        }
      },
      20: {
        name: "NAV_RETURN_TO_LAUNCH",
        description: "Return to launch location",
        param: {
          1: "Empty",
          2: "Empty",
          3: "Empty",
          4: "Empty",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      21: {
        name: "NAV_LAND",
        description: "Land at location",
        param: {
          1: "Abort Alt",
          2: "Precision land mode. (0 = normal landing, 1 = opportunistic precision landing, 2 = required precsion landing)",
          3: "Empty",
          4: "Desired yaw angle. NaN for unchanged.",
          5: "Latitude",
          6: "Longitude",
          7: "Altitude (ground level)"
        }
      },
      22: {
        name: "NAV_TAKEOFF",
        description: "Takeoff from ground / hand",
        param: {
          1: "Minimum pitch (if airspeed sensor present), desired pitch without sensor",
          2: "Empty",
          3: "Empty",
          4: "Yaw angle (if magnetometer present), ignored without magnetometer. NaN for unchanged.",
          5: "Latitude",
          6: "Longitude",
          7: "Altitude"
        }
      },
      23: {
        name: "NAV_LAND_LOCAL",
        description: "Land at local position (local frame only)",
        param: {
          1: "Landing target number (if available)",
          2: "Maximum accepted offset from desired landing position [m] - computed magnitude from spherical coordinates: d = sqrt(x^2 + y^2 + z^2), which gives the maximum accepted distance between the desired landing position and the position where the vehicle is about to land",
          3: "Landing descend rate [ms^-1]",
          4: "Desired yaw angle [rad]",
          5: "Y-axis position [m]",
          6: "X-axis position [m]",
          7: "Z-axis / ground level position [m]"
        }
      },
      24: {
        name: "NAV_TAKEOFF_LOCAL",
        description: "Takeoff from local position (local frame only)",
        param: {
          1: "Minimum pitch (if airspeed sensor present), desired pitch without sensor [rad]",
          2: "Empty",
          3: "Takeoff ascend rate [ms^-1]",
          4: "Yaw angle [rad] (if magnetometer or another yaw estimation source present), ignored without one of these",
          5: "Y-axis position [m]",
          6: "X-axis position [m]",
          7: "Z-axis position [m]"
        }
      },
      25: {
        name: "NAV_FOLLOW",
        description: "Vehicle following, i.e. this waypoint represents the position of a moving vehicle",
        param: {
          1: "Following logic to use (e.g. loitering or sinusoidal following) - depends on specific autopilot implementation",
          2: "Ground speed of vehicle to be followed",
          3: "Radius around waypoint, in meters. If positive loiter clockwise, else counter-clockwise",
          4: "Desired yaw angle.",
          5: "Latitude",
          6: "Longitude",
          7: "Altitude"
        }
      },
      30: {
        name: "NAV_CONTINUE_AND_CHANGE_ALT",
        description: "Continue on the current course and climb/descend to specified altitude.  When the altitude is reached continue to the next command (i.e., don't proceed to the next command until the desired altitude is reached.",
        param: {
          1: "Climb or Descend (0 = Neutral, command completes when within 5m of this command's altitude, 1 = Climbing, command completes when at or above this command's altitude, 2 = Descending, command completes when at or below this command's altitude.",
          2: "Empty",
          3: "Empty",
          4: "Empty",
          5: "Empty",
          6: "Empty",
          7: "Desired altitude in meters"
        }
      },
      31: {
        name: "NAV_LOITER_TO_ALT",
        description: "Begin loiter at the specified Latitude and Longitude.  If Lat=Lon=0, then loiter at the current position.  Don't consider the navigation command complete (don't leave loiter) until the altitude has been reached.  Additionally, if the Heading Required parameter is non-zero the  aircraft will not leave the loiter until heading toward the next waypoint.",
        param: {
          1: "Heading Required (0 = False)",
          2: "Radius in meters. If positive loiter clockwise, negative counter-clockwise, 0 means no change to standard loiter.",
          3: "Empty",
          4: "Forward moving aircraft this sets exit xtrack location: 0 for center of loiter wp, 1 for exit location",
          5: "Latitude",
          6: "Longitude",
          7: "Altitude"
        }
      },
      32: {
        name: "DO_FOLLOW",
        description: "Being following a target",
        param: {
          1: "System ID (the system ID of the FOLLOW_TARGET beacon). Send 0 to disable follow-me and return to the default position hold mode",
          2: "RESERVED",
          3: "RESERVED",
          4: "altitude flag: 0: Keep current altitude, 1: keep altitude difference to target, 2: go to a fixed altitude above home",
          5: "altitude",
          6: "RESERVED",
          7: "TTL in seconds in which the MAV should go to the default position hold mode after a message rx timeout"
        }
      },
      33: {
        name: "DO_FOLLOW_REPOSITION",
        description: "Reposition the MAV after a follow target command has been sent",
        param: {
          1: "Camera q1 (where 0 is on the ray from the camera to the tracking device)",
          2: "Camera q2",
          3: "Camera q3",
          4: "Camera q4",
          5: "altitude offset from target (m)",
          6: "X offset from target (m)",
          7: "Y offset from target (m)"
        }
      },
      80: {
        name: "NAV_ROI",
        description: "THIS INTERFACE IS DEPRECATED AS OF JANUARY 2018. Please use MAV_CMD_DO_SET_ROI_* messages instead. Sets the region of interest (ROI) for a sensor set or the vehicle itself. This can then be used by the vehicles control system to control the vehicle attitude and the attitude of various sensors such as cameras.",
        param: {
          1: "Region of interest mode. (see MAV_ROI enum)",
          2: "Waypoint index/ target ID. (see MAV_ROI enum)",
          3: "ROI index (allows a vehicle to manage multiple ROI's)",
          4: "Empty",
          5: "x the location of the fixed ROI (see MAV_FRAME)",
          6: "y",
          7: "z"
        }
      },
      81: {
        name: "NAV_PATHPLANNING",
        description: "Control autonomous path planning on the MAV.",
        param: {
          1: "0: Disable local obstacle avoidance / local path planning (without resetting map), 1: Enable local path planning, 2: Enable and reset local path planning",
          2: "0: Disable full path planning (without resetting map), 1: Enable, 2: Enable and reset map/occupancy grid, 3: Enable and reset planned route, but not occupancy grid",
          3: "Empty",
          4: "Yaw angle at goal, in compass degrees, [0..360]",
          5: "Latitude/X of goal",
          6: "Longitude/Y of goal",
          7: "Altitude/Z of goal"
        }
      },
      82: {
        name: "NAV_SPLINE_WAYPOINT",
        description: "Navigate to waypoint using a spline path.",
        param: {
          1: "Hold time in decimal seconds. (ignored by fixed wing, time to stay at waypoint for rotary wing)",
          2: "Empty",
          3: "Empty",
          4: "Empty",
          5: "Latitude/X of goal",
          6: "Longitude/Y of goal",
          7: "Altitude/Z of goal"
        }
      },
      83: {
        name: "NAV_ALTITUDE_WAIT",
        description: "Mission command to wait for an altitude or downwards vertical speed. This is meant for high altitude balloon launches, allowing the aircraft to be idle until either an altitude is reached or a negative vertical speed is reached (indicating early balloon burst). The wiggle time is how often to wiggle the control surfaces to prevent them seizing up.",
        param: {
          1: "Altitude (m).",
          2: "Descent speed (m/s).",
          3: "Wiggle Time (s).",
          4: "Empty.",
          5: "Empty.",
          6: "Empty.",
          7: "Empty."
        }
      },
      84: {
        name: "NAV_VTOL_TAKEOFF",
        description: "Takeoff from ground using VTOL mode",
        param: {
          1: "Empty",
          2: "Front transition heading, see VTOL_TRANSITION_HEADING enum.",
          3: "Empty",
          4: "Yaw angle in degrees. NaN for unchanged.",
          5: "Latitude",
          6: "Longitude",
          7: "Altitude"
        }
      },
      85: {
        name: "NAV_VTOL_LAND",
        description: "Land using VTOL mode",
        param: {
          1: "Empty",
          2: "Empty",
          3: "Approach altitude (with the same reference as the Altitude field). NaN if unspecified.",
          4: "Yaw angle in degrees. NaN for unchanged.",
          5: "Latitude",
          6: "Longitude",
          7: "Altitude (ground level)"
        }
      },
      92: {
        name: "NAV_GUIDED_ENABLE",
        description: "hand control over to an external controller",
        param: {
          1: "On / Off (> 0.5f on)",
          2: "Empty",
          3: "Empty",
          4: "Empty",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      93: {
        name: "NAV_DELAY",
        description: "Delay the next navigation command a number of seconds or until a specified time",
        param: {
          1: "Delay in seconds (decimal, -1 to enable time-of-day fields)",
          2: "hour (24h format, UTC, -1 to ignore)",
          3: "minute (24h format, UTC, -1 to ignore)",
          4: "second (24h format, UTC)",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      94: {
        name: "NAV_PAYLOAD_PLACE",
        description: "Descend and place payload.  Vehicle descends until it detects a hanging payload has reached the ground, the gripper is opened to release the payload",
        param: {
          1: "Maximum distance to descend (meters)",
          2: "Empty",
          3: "Empty",
          4: "Empty",
          5: "Latitude (deg * 1E7)",
          6: "Longitude (deg * 1E7)",
          7: "Altitude (meters)"
        }
      },
      95: {
        name: "NAV_LAST",
        description: "NOP - This command is only used to mark the upper limit of the NAV/ACTION commands in the enumeration",
        param: {
          1: "Empty",
          2: "Empty",
          3: "Empty",
          4: "Empty",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      112: {
        name: "CONDITION_DELAY",
        description: "Delay mission state machine.",
        param: {
          1: "Delay in seconds (decimal)",
          2: "Empty",
          3: "Empty",
          4: "Empty",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      113: {
        name: "CONDITION_CHANGE_ALT",
        description: "Ascend/descend at rate.  Delay mission state machine until desired altitude reached.",
        param: {
          1: "Descent / Ascend rate (m/s)",
          2: "Empty",
          3: "Empty",
          4: "Empty",
          5: "Empty",
          6: "Empty",
          7: "Finish Altitude"
        }
      },
      114: {
        name: "CONDITION_DISTANCE",
        description: "Delay mission state machine until within desired distance of next NAV point.",
        param: {
          1: "Distance (meters)",
          2: "Empty",
          3: "Empty",
          4: "Empty",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      115: {
        name: "CONDITION_YAW",
        description: "Reach a certain target angle.",
        param: {
          1: "target angle: [0-360], 0 is north",
          2: "speed during yaw change:[deg per second]",
          3: "direction: negative: counter clockwise, positive: clockwise [-1,1]",
          4: "relative offset or absolute angle: [ 1,0]",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      159: {
        name: "CONDITION_LAST",
        description: "NOP - This command is only used to mark the upper limit of the CONDITION commands in the enumeration",
        param: {
          1: "Empty",
          2: "Empty",
          3: "Empty",
          4: "Empty",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      176: {
        name: "DO_SET_MODE",
        description: "Set system mode.",
        param: {
          1: "Mode, as defined by ENUM MAV_MODE",
          2: "Custom mode - this is system specific, please refer to the individual autopilot specifications for details.",
          3: "Custom sub mode - this is system specific, please refer to the individual autopilot specifications for details.",
          4: "Empty",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      177: {
        name: "DO_JUMP",
        description: "Jump to the desired command in the mission list.  Repeat this action only the specified number of times",
        param: {
          1: "Sequence number",
          2: "Repeat count",
          3: "Empty",
          4: "Empty",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      178: {
        name: "DO_CHANGE_SPEED",
        description: "Change speed and/or throttle set points.",
        param: {
          1: "Speed type (0=Airspeed, 1=Ground Speed, 2=Climb Speed, 3=Descent Speed)",
          2: "Speed  (m/s, -1 indicates no change)",
          3: "Throttle  ( Percent, -1 indicates no change)",
          4: "absolute or relative [0,1]",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      179: {
        name: "DO_SET_HOME",
        description: "Changes the home location either to the current location or a specified location.",
        param: {
          1: "Use current (1=use current location, 0=use specified location)",
          2: "Empty",
          3: "Empty",
          4: "Empty",
          5: "Latitude",
          6: "Longitude",
          7: "Altitude"
        }
      },
      180: {
        name: "DO_SET_PARAMETER",
        description: "Set a system parameter.  Caution!  Use of this command requires knowledge of the numeric enumeration value of the parameter.",
        param: {
          1: "Parameter number",
          2: "Parameter value",
          3: "Empty",
          4: "Empty",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      181: {
        name: "DO_SET_RELAY",
        description: "Set a relay to a condition.",
        param: {
          1: "Relay number",
          2: "Setting (1=on, 0=off, others possible depending on system hardware)",
          3: "Empty",
          4: "Empty",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      182: {
        name: "DO_REPEAT_RELAY",
        description: "Cycle a relay on and off for a desired number of cycles with a desired period.",
        param: {
          1: "Relay number",
          2: "Cycle count",
          3: "Cycle time (seconds, decimal)",
          4: "Empty",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      183: {
        name: "DO_SET_SERVO",
        description: "Set a servo to a desired PWM value.",
        param: {
          1: "Servo number",
          2: "PWM (microseconds, 1000 to 2000 typical)",
          3: "Empty",
          4: "Empty",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      184: {
        name: "DO_REPEAT_SERVO",
        description: "Cycle a between its nominal setting and a desired PWM for a desired number of cycles with a desired period.",
        param: {
          1: "Servo number",
          2: "PWM (microseconds, 1000 to 2000 typical)",
          3: "Cycle count",
          4: "Cycle time (seconds)",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      185: {
        name: "DO_FLIGHTTERMINATION",
        description: "Terminate flight immediately",
        param: {
          1: "Flight termination activated if > 0.5",
          2: "Empty",
          3: "Empty",
          4: "Empty",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      186: {
        name: "DO_CHANGE_ALTITUDE",
        description: "Change altitude set point.",
        param: {
          1: "Altitude in meters",
          2: "Mav frame of new altitude (see MAV_FRAME)",
          3: "Empty",
          4: "Empty",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      189: {
        name: "DO_LAND_START",
        description: "Mission command to perform a landing. This is used as a marker in a mission to tell the autopilot where a sequence of mission items that represents a landing starts. It may also be sent via a COMMAND_LONG to trigger a landing, in which case the nearest (geographically) landing sequence in the mission will be used. The Latitude/Longitude is optional, and may be set to 0 if not needed. If specified then it will be used to help find the closest landing sequence.",
        param: {
          1: "Empty",
          2: "Empty",
          3: "Empty",
          4: "Empty",
          5: "Latitude",
          6: "Longitude",
          7: "Empty"
        }
      },
      190: {
        name: "DO_RALLY_LAND",
        description: "Mission command to perform a landing from a rally point.",
        param: {
          1: "Break altitude (meters)",
          2: "Landing speed (m/s)",
          3: "Empty",
          4: "Empty",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      191: {
        name: "DO_GO_AROUND",
        description: "Mission command to safely abort an autonomous landing.",
        param: {
          1: "Altitude (meters)",
          2: "Empty",
          3: "Empty",
          4: "Empty",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      192: {
        name: "DO_REPOSITION",
        description: "Reposition the vehicle to a specific WGS84 global position.",
        param: {
          1: "Ground speed, less than 0 (-1) for default",
          2: "Bitmask of option flags, see the MAV_DO_REPOSITION_FLAGS enum.",
          3: "Reserved",
          4: "Yaw heading, NaN for unchanged. For planes indicates loiter direction (0: clockwise, 1: counter clockwise)",
          5: "Latitude (deg * 1E7)",
          6: "Longitude (deg * 1E7)",
          7: "Altitude (meters)"
        }
      },
      193: {
        name: "DO_PAUSE_CONTINUE",
        description: "If in a GPS controlled position mode, hold the current position or continue.",
        param: {
          1: "0: Pause current mission or reposition command, hold current position. 1: Continue mission. A VTOL capable vehicle should enter hover mode (multicopter and VTOL planes). A plane should loiter with the default loiter radius.",
          2: "Reserved",
          3: "Reserved",
          4: "Reserved",
          5: "Reserved",
          6: "Reserved",
          7: "Reserved"
        }
      },
      194: {
        name: "DO_SET_REVERSE",
        description: "Set moving direction to forward or reverse.",
        param: {
          1: "Direction (0=Forward, 1=Reverse)",
          2: "Empty",
          3: "Empty",
          4: "Empty",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      195: {
        name: "DO_SET_ROI_LOCATION",
        description: "Sets the region of interest (ROI) to a location. This can then be used by the vehicles control system to control the vehicle attitude and the attitude of various sensors such as cameras.",
        param: {
          1: "Empty",
          2: "Empty",
          3: "Empty",
          4: "Empty",
          5: "Latitude",
          6: "Longitude",
          7: "Altitude"
        }
      },
      196: {
        name: "DO_SET_ROI_WPNEXT_OFFSET",
        description: "Sets the region of interest (ROI) to be toward next waypoint, with optional pitch/roll/yaw offset. This can then be used by the vehicles control system to control the vehicle attitude and the attitude of various sensors such as cameras.",
        param: {
          1: "Empty",
          2: "Empty",
          3: "Empty",
          4: "Empty",
          5: "pitch offset from next waypoint",
          6: "roll offset from next waypoint",
          7: "yaw offset from next waypoint"
        }
      },
      197: {
        name: "DO_SET_ROI_NONE",
        description: "Cancels any previous ROI command returning the vehicle/sensors to default flight characteristics. This can then be used by the vehicles control system to control the vehicle attitude and the attitude of various sensors such as cameras.",
        param: {
          1: "Empty",
          2: "Empty",
          3: "Empty",
          4: "Empty",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      200: {
        name: "DO_CONTROL_VIDEO",
        description: "Control onboard camera system.",
        param: {
          1: "Camera ID (-1 for all)",
          2: "Transmission: 0: disabled, 1: enabled compressed, 2: enabled raw",
          3: "Transmission mode: 0: video stream, >0: single images every n seconds (decimal)",
          4: "Recording: 0: disabled, 1: enabled compressed, 2: enabled raw",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      201: {
        name: "DO_SET_ROI",
        description: "THIS INTERFACE IS DEPRECATED AS OF JANUARY 2018. Please use MAV_CMD_DO_SET_ROI_* messages instead. Sets the region of interest (ROI) for a sensor set or the vehicle itself. This can then be used by the vehicles control system to control the vehicle attitude and the attitude of various sensors such as cameras.",
        param: {
          1: "Region of interest mode. (see MAV_ROI enum)",
          2: "Waypoint index/ target ID. (see MAV_ROI enum)",
          3: "ROI index (allows a vehicle to manage multiple ROI's)",
          4: "Empty",
          5: "x the location of the fixed ROI (see MAV_FRAME)",
          6: "y",
          7: "z"
        }
      },
      202: {
        name: "DO_DIGICAM_CONFIGURE",
        description: "Mission command to configure an on-board camera controller system.",
        param: {
          1: "Modes: P, TV, AV, M, Etc",
          2: "Shutter speed: Divisor number for one second",
          3: "Aperture: F stop number",
          4: "ISO number e.g. 80, 100, 200, Etc",
          5: "Exposure type enumerator",
          6: "Command Identity",
          7: "Main engine cut-off time before camera trigger in seconds/10 (0 means no cut-off)"
        }
      },
      203: {
        name: "DO_DIGICAM_CONTROL",
        description: "Mission command to control an on-board camera controller system.",
        param: {
          1: "Session control e.g. show/hide lens",
          2: "Zoom's absolute position",
          3: "Zooming step value to offset zoom from the current position",
          4: "Focus Locking, Unlocking or Re-locking",
          5: "Shooting Command",
          6: "Command Identity",
          7: "Test shot identifier. If set to 1, image will only be captured, but not counted towards internal frame count."
        }
      },
      204: {
        name: "DO_MOUNT_CONFIGURE",
        description: "Mission command to configure a camera or antenna mount",
        param: {
          1: "Mount operation mode (see MAV_MOUNT_MODE enum)",
          2: "stabilize roll? (1 = yes, 0 = no)",
          3: "stabilize pitch? (1 = yes, 0 = no)",
          4: "stabilize yaw? (1 = yes, 0 = no)",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      205: {
        name: "DO_MOUNT_CONTROL",
        description: "Mission command to control a camera or antenna mount",
        param: {
          1: "pitch (WIP: DEPRECATED: or lat in degrees) depending on mount mode.",
          2: "roll (WIP: DEPRECATED: or lon in degrees) depending on mount mode.",
          3: "yaw (WIP: DEPRECATED: or alt in meters) depending on mount mode.",
          4: "WIP: alt in meters depending on mount mode.",
          5: "WIP: latitude in degrees * 1E7, set if appropriate mount mode.",
          6: "WIP: longitude in degrees * 1E7, set if appropriate mount mode.",
          7: "MAV_MOUNT_MODE enum value"
        }
      },
      206: {
        name: "DO_SET_CAM_TRIGG_DIST",
        description: "Mission command to set camera trigger distance for this flight. The camera is triggered each time this distance is exceeded. This command can also be used to set the shutter integration time for the camera.",
        param: {
          1: "Camera trigger distance (meters). 0 to stop triggering.",
          2: "Camera shutter integration time (milliseconds). -1 or 0 to ignore",
          3: "Trigger camera once immediately. (0 = no trigger, 1 = trigger)",
          4: "Empty",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      207: {
        name: "DO_FENCE_ENABLE",
        description: "Mission command to enable the geofence",
        param: {
          1: "enable? (0=disable, 1=enable, 2=disable_floor_only)",
          2: "Empty",
          3: "Empty",
          4: "Empty",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      208: {
        name: "DO_PARACHUTE",
        description: "Mission command to trigger a parachute",
        param: {
          1: "action (0=disable, 1=enable, 2=release, for some systems see PARACHUTE_ACTION enum, not in general message set.)",
          2: "Empty",
          3: "Empty",
          4: "Empty",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      209: {
        name: "DO_MOTOR_TEST",
        description: "Mission command to perform motor test",
        param: {
          1: "motor number (a number from 1 to max number of motors on the vehicle)",
          2: "throttle type (0=throttle percentage, 1=PWM, 2=pilot throttle channel pass-through. See MOTOR_TEST_THROTTLE_TYPE enum)",
          3: "throttle",
          4: "timeout (in seconds)",
          5: "motor count (number of motors to test to test in sequence, waiting for the timeout above between them; 0=1 motor, 1=1 motor, 2=2 motors...)",
          6: "motor test order (See MOTOR_TEST_ORDER enum)",
          7: "Empty"
        }
      },
      210: {
        name: "DO_INVERTED_FLIGHT",
        description: "Change to/from inverted flight",
        param: {
          1: "inverted (0=normal, 1=inverted)",
          2: "Empty",
          3: "Empty",
          4: "Empty",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      211: {
        name: "DO_GRIPPER",
        description: "Mission command to operate EPM gripper.",
        param: {
          1: "Gripper number (a number from 1 to max number of grippers on the vehicle).",
          2: "Gripper action (0=release, 1=grab. See GRIPPER_ACTIONS enum).",
          3: "Empty.",
          4: "Empty.",
          5: "Empty.",
          6: "Empty.",
          7: "Empty."
        }
      },
      212: {
        name: "DO_AUTOTUNE_ENABLE",
        description: "Enable/disable autotune.",
        param: {
          1: "Enable (1: enable, 0:disable).",
          2: "Empty.",
          3: "Empty.",
          4: "Empty.",
          5: "Empty.",
          6: "Empty.",
          7: "Empty."
        }
      },
      213: {
        name: "NAV_SET_YAW_SPEED",
        description: "Sets a desired vehicle turn angle and speed change",
        param: {
          1: "yaw angle to adjust steering by in centidegress",
          2: "speed - normalized to 0 .. 1",
          3: "Empty",
          4: "Empty",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      214: {
        name: "DO_SET_CAM_TRIGG_INTERVAL",
        description: "Mission command to set camera trigger interval for this flight. If triggering is enabled, the camera is triggered each time this interval expires. This command can also be used to set the shutter integration time for the camera.",
        param: {
          1: "Camera trigger cycle time (milliseconds). -1 or 0 to ignore.",
          2: "Camera shutter integration time (milliseconds). Should be less than trigger cycle time. -1 or 0 to ignore.",
          3: "Empty",
          4: "Empty",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      220: {
        name: "DO_MOUNT_CONTROL_QUAT",
        description: "Mission command to control a camera or antenna mount, using a quaternion as reference.",
        param: {
          1: "q1 - quaternion param #1, w (1 in null-rotation)",
          2: "q2 - quaternion param #2, x (0 in null-rotation)",
          3: "q3 - quaternion param #3, y (0 in null-rotation)",
          4: "q4 - quaternion param #4, z (0 in null-rotation)",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      221: {
        name: "DO_GUIDED_MASTER",
        description: "set id of master controller",
        param: {
          1: "System ID",
          2: "Component ID",
          3: "Empty",
          4: "Empty",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      222: {
        name: "DO_GUIDED_LIMITS",
        description: "set limits for external control",
        param: {
          1: "timeout - maximum time (in seconds) that external controller will be allowed to control vehicle. 0 means no timeout",
          2: "Absolute altitude (AMSL) min, in meters - if vehicle moves below this alt, the command will be aborted and the mission will continue. 0 means no lower altitude limit",
          3: "Absolute altitude (AMSL) max, in meters - if vehicle moves above this alt, the command will be aborted and the mission will continue. 0 means no upper altitude limit",
          4: "Horizontal move limit (AMSL), in meters - if vehicle moves more than this distance from its location at the moment the command was executed, the command will be aborted and the mission will continue. 0 means no horizontal altitude limit",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      223: {
        name: "DO_ENGINE_CONTROL",
        description: "Control vehicle engine. This is interpreted by the vehicles engine controller to change the target engine state. It is intended for vehicles with internal combustion engines",
        param: {
          1: "0: Stop engine, 1:Start Engine",
          2: "0: Warm start, 1:Cold start. Controls use of choke where applicable",
          3: "Height delay (meters). This is for commanding engine start only after the vehicle has gained the specified height. Used in VTOL vehicles during takeoff to start engine after the aircraft is off the ground. Zero for no delay.",
          4: "Empty",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      240: {
        name: "DO_LAST",
        description: "NOP - This command is only used to mark the upper limit of the DO commands in the enumeration",
        param: {
          1: "Empty",
          2: "Empty",
          3: "Empty",
          4: "Empty",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      241: {
        name: "PREFLIGHT_CALIBRATION",
        description: "Trigger calibration. This command will be only accepted if in pre-flight mode. Except for Temperature Calibration, only one sensor should be set in a single message and all others should be zero.",
        param: {
          1: "1: gyro calibration, 3: gyro temperature calibration",
          2: "1: magnetometer calibration",
          3: "1: ground pressure calibration",
          4: "1: radio RC calibration, 2: RC trim calibration",
          5: "1: accelerometer calibration, 2: board level calibration, 3: accelerometer temperature calibration, 4: simple accelerometer calibration",
          6: "1: APM: compass/motor interference calibration (PX4: airspeed calibration, deprecated), 2: airspeed calibration",
          7: "1: ESC calibration, 3: barometer temperature calibration"
        }
      },
      242: {
        name: "PREFLIGHT_SET_SENSOR_OFFSETS",
        description: "Set sensor offsets. This command will be only accepted if in pre-flight mode.",
        param: {
          1: "Sensor to adjust the offsets for: 0: gyros, 1: accelerometer, 2: magnetometer, 3: barometer, 4: optical flow, 5: second magnetometer, 6: third magnetometer",
          2: "X axis offset (or generic dimension 1), in the sensor's raw units",
          3: "Y axis offset (or generic dimension 2), in the sensor's raw units",
          4: "Z axis offset (or generic dimension 3), in the sensor's raw units",
          5: "Generic dimension 4, in the sensor's raw units",
          6: "Generic dimension 5, in the sensor's raw units",
          7: "Generic dimension 6, in the sensor's raw units"
        }
      },
      243: {
        name: "PREFLIGHT_UAVCAN",
        description: "Trigger UAVCAN config. This command will be only accepted if in pre-flight mode.",
        param: {
          1: "1: Trigger actuator ID assignment and direction mapping.",
          2: "Reserved",
          3: "Reserved",
          4: "Reserved",
          5: "Reserved",
          6: "Reserved",
          7: "Reserved"
        }
      },
      245: {
        name: "PREFLIGHT_STORAGE",
        description: "Request storage of different parameter values and logs. This command will be only accepted if in pre-flight mode.",
        param: {
          1: "Parameter storage: 0: READ FROM FLASH/EEPROM, 1: WRITE CURRENT TO FLASH/EEPROM, 2: Reset to defaults",
          2: "Mission storage: 0: READ FROM FLASH/EEPROM, 1: WRITE CURRENT TO FLASH/EEPROM, 2: Reset to defaults",
          3: "Onboard logging: 0: Ignore, 1: Start default rate logging, -1: Stop logging, > 1: start logging with rate of param 3 in Hz (e.g. set to 1000 for 1000 Hz logging)",
          4: "Reserved",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      246: {
        name: "PREFLIGHT_REBOOT_SHUTDOWN",
        description: "Request the reboot or shutdown of system components.",
        param: {
          1: "0: Do nothing for autopilot, 1: Reboot autopilot, 2: Shutdown autopilot, 3: Reboot autopilot and keep it in the bootloader until upgraded.",
          2: "0: Do nothing for onboard computer, 1: Reboot onboard computer, 2: Shutdown onboard computer, 3: Reboot onboard computer and keep it in the bootloader until upgraded.",
          3: "WIP: 0: Do nothing for camera, 1: Reboot onboard camera, 2: Shutdown onboard camera, 3: Reboot onboard camera and keep it in the bootloader until upgraded",
          4: "WIP: 0: Do nothing for mount (e.g. gimbal), 1: Reboot mount, 2: Shutdown mount, 3: Reboot mount and keep it in the bootloader until upgraded",
          5: "Reserved, send 0",
          6: "Reserved, send 0",
          7: "WIP: ID (e.g. camera ID -1 for all IDs)"
        }
      },
      252: {
        name: "OVERRIDE_GOTO",
        description: "Hold / continue the current action",
        param: {
          1: "MAV_GOTO_DO_HOLD: hold MAV_GOTO_DO_CONTINUE: continue with next item in mission plan",
          2: "MAV_GOTO_HOLD_AT_CURRENT_POSITION: Hold at current position MAV_GOTO_HOLD_AT_SPECIFIED_POSITION: hold at specified position",
          3: "MAV_FRAME coordinate frame of hold point",
          4: "Desired yaw angle in degrees",
          5: "Latitude / X position",
          6: "Longitude / Y position",
          7: "Altitude / Z position"
        }
      },
      300: {
        name: "MISSION_START",
        description: "start running a mission",
        param: {
          1: "first_item: the first mission item to run",
          2: "last_item:  the last mission item to run (after this item is run, the mission ends)"
        }
      },
      400: {
        name: "COMPONENT_ARM_DISARM",
        description: "Arms / Disarms a component",
        param: {
          1: "1 to arm, 0 to disarm"
        }
      },
      410: {
        name: "GET_HOME_POSITION",
        description: "Request the home position from the vehicle.",
        param: {
          1: "Reserved",
          2: "Reserved",
          3: "Reserved",
          4: "Reserved",
          5: "Reserved",
          6: "Reserved",
          7: "Reserved"
        }
      },
      500: {
        name: "START_RX_PAIR",
        description: "Starts receiver pairing",
        param: {
          1: "0:Spektrum",
          2: "RC type (see RC_TYPE enum)"
        }
      },
      510: {
        name: "GET_MESSAGE_INTERVAL",
        description: "Request the interval between messages for a particular MAVLink message ID",
        param: {
          1: "The MAVLink message ID"
        }
      },
      511: {
        name: "SET_MESSAGE_INTERVAL",
        description: "Set the interval between messages for a particular MAVLink message ID. This interface replaces REQUEST_DATA_STREAM",
        param: {
          1: "The MAVLink message ID",
          2: "The interval between two messages, in microseconds. Set to -1 to disable and 0 to request default rate."
        }
      },
      520: {
        name: "REQUEST_AUTOPILOT_CAPABILITIES",
        description: "Request autopilot capabilities",
        param: {
          1: "1: Request autopilot version",
          2: "Reserved (all remaining params)"
        }
      },
      521: {
        name: "REQUEST_CAMERA_INFORMATION",
        description: "Request camera information (CAMERA_INFORMATION).",
        param: {
          1: "0: No action 1: Request camera capabilities",
          2: "Reserved (all remaining params)"
        }
      },
      522: {
        name: "REQUEST_CAMERA_SETTINGS",
        description: "Request camera settings (CAMERA_SETTINGS).",
        param: {
          1: "0: No Action 1: Request camera settings",
          2: "Reserved (all remaining params)"
        }
      },
      525: {
        name: "REQUEST_STORAGE_INFORMATION",
        description: "Request storage information (STORAGE_INFORMATION)",
        param: {
          1: "1: Request storage information",
          2: "Storage ID",
          3: "Reserved (all remaining params)"
        }
      },
      526: {
        name: "STORAGE_FORMAT",
        description: "Format a storage medium",
        param: {
          1: "1: Format storage",
          2: "Storage ID",
          3: "Reserved (all remaining params)"
        }
      },
      527: {
        name: "REQUEST_CAMERA_CAPTURE_STATUS",
        description: "Request camera capture status (CAMERA_CAPTURE_STATUS)",
        param: {
          1: "0: No Action 1: Request camera capture status",
          2: "Reserved (all remaining params)"
        }
      },
      528: {
        name: "REQUEST_FLIGHT_INFORMATION",
        description: "Request flight information (FLIGHT_INFORMATION)",
        param: {
          1: "1: Request flight information",
          2: "Reserved (all remaining params)"
        }
      },
      529: {
        name: "RESET_CAMERA_SETTINGS",
        description: "Reset all camera settings to Factory Default",
        param: {
          1: "0: No Action 1: Reset all settings",
          2: "Reserved (all remaining params)"
        }
      },
      530: {
        name: "SET_CAMERA_MODE",
        description: "Set camera running mode. Use NAN for reserved values.",
        param: {
          1: "Reserved (Set to 0)",
          2: "Camera mode (see CAMERA_MODE enum)",
          3: "Reserved (all remaining params)"
        }
      },
      2000: {
        name: "IMAGE_START_CAPTURE",
        description: "Start image capture sequence. Sends CAMERA_IMAGE_CAPTURED after each capture. Use NAN for reserved values.",
        param: {
          1: "Reserved (Set to 0)",
          2: "Duration between two consecutive pictures (in seconds)",
          3: "Number of images to capture total - 0 for unlimited capture",
          4: "Capture sequence (ID to prevent double captures when a command is retransmitted, 0: unused, >= 1: used)",
          5: "Reserved (all remaining params)"
        }
      },
      2001: {
        name: "IMAGE_STOP_CAPTURE",
        description: "Stop image capture sequence Use NAN for reserved values.",
        param: {
          1: "Reserved (Set to 0)",
          2: "Reserved (all remaining params)"
        }
      },
      2003: {
        name: "DO_TRIGGER_CONTROL",
        description: "Enable or disable on-board camera triggering system.",
        param: {
          1: "Trigger enable/disable (0 for disable, 1 for start), -1 to ignore",
          2: "1 to reset the trigger sequence, -1 or 0 to ignore",
          3: "1 to pause triggering, but without switching the camera off or retracting it. -1 to ignore"
        }
      },
      2500: {
        name: "VIDEO_START_CAPTURE",
        description: "Starts video capture (recording). Use NAN for reserved values.",
        param: {
          1: "Reserved (Set to 0)",
          2: "Frequency CAMERA_CAPTURE_STATUS messages should be sent while recording (0 for no messages, otherwise frequency in Hz)",
          3: "Reserved (all remaining params)"
        }
      },
      2501: {
        name: "VIDEO_STOP_CAPTURE",
        description: "Stop the current video capture (recording). Use NAN for reserved values.",
        param: {
          1: "Reserved (Set to 0)",
          2: "Reserved (all remaining params)"
        }
      },
      2510: {
        name: "LOGGING_START",
        description: "Request to start streaming logging data over MAVLink (see also LOGGING_DATA message)",
        param: {
          1: "Format: 0: ULog",
          2: "Reserved (set to 0)",
          3: "Reserved (set to 0)",
          4: "Reserved (set to 0)",
          5: "Reserved (set to 0)",
          6: "Reserved (set to 0)",
          7: "Reserved (set to 0)"
        }
      },
      2511: {
        name: "LOGGING_STOP",
        description: "Request to stop streaming log data over MAVLink",
        param: {
          1: "Reserved (set to 0)",
          2: "Reserved (set to 0)",
          3: "Reserved (set to 0)",
          4: "Reserved (set to 0)",
          5: "Reserved (set to 0)",
          6: "Reserved (set to 0)",
          7: "Reserved (set to 0)"
        }
      },
      2520: {
        name: "AIRFRAME_CONFIGURATION",
        description: "",
        param: {
          1: "Landing gear ID (default: 0, -1 for all)",
          2: "Landing gear position (Down: 0, Up: 1, NAN for no change)",
          3: "Reserved, set to NAN",
          4: "Reserved, set to NAN",
          5: "Reserved, set to NAN",
          6: "Reserved, set to NAN",
          7: "Reserved, set to NAN"
        }
      },
      2600: {
        name: "CONTROL_HIGH_LATENCY",
        description: "Request to start/stop transmitting over the high latency telemetry",
        param: {
          1: "Control transmission over high latency telemetry (0: stop, 1: start)",
          2: "Empty",
          3: "Empty",
          4: "Empty",
          5: "Empty",
          6: "Empty",
          7: "Empty"
        }
      },
      2800: {
        name: "PANORAMA_CREATE",
        description: "Create a panorama at the current position",
        param: {
          1: "Viewing angle horizontal of the panorama (in degrees, +- 0.5 the total angle)",
          2: "Viewing angle vertical of panorama (in degrees)",
          3: "Speed of the horizontal rotation (in degrees per second)",
          4: "Speed of the vertical rotation (in degrees per second)"
        }
      },
      3000: {
        name: "DO_VTOL_TRANSITION",
        description: "Request VTOL transition",
        param: {
          1: "The target VTOL state, as defined by ENUM MAV_VTOL_STATE. Only MAV_VTOL_STATE_MC and MAV_VTOL_STATE_FW can be used."
        }
      },
      3001: {
        name: "ARM_AUTHORIZATION_REQUEST",
        description: "Request authorization to arm the vehicle to a external entity, the arm authorizer is responsible to request all data that is needs from the vehicle before authorize or deny the request. If approved the progress of command_ack message should be set with period of time that this authorization is valid in seconds or in case it was denied it should be set with one of the reasons in ARM_AUTH_DENIED_REASON.\n        ",
        param: {
          1: "Vehicle system id, this way ground station can request arm authorization on behalf of any vehicle"
        }
      },
      4000: {
        name: "SET_GUIDED_SUBMODE_STANDARD",
        description: "This command sets the submode to standard guided when vehicle is in guided mode. The vehicle holds position and altitude and the user can input the desired velocities along all three axes.\n                  ",
        param: {}
      },
      4001: {
        name: "SET_GUIDED_SUBMODE_CIRCLE",
        description: "This command sets submode circle when vehicle is in guided mode. Vehicle flies along a circle facing the center of the circle. The user can input the velocity along the circle and change the radius. If no input is given the vehicle will hold position.\n                  ",
        param: {
          1: "Radius of desired circle in CIRCLE_MODE",
          2: "User defined",
          3: "User defined",
          4: "User defined",
          5: "Unscaled target latitude of center of circle in CIRCLE_MODE",
          6: "Unscaled target longitude of center of circle in CIRCLE_MODE"
        }
      },
      5000: {
        name: "NAV_FENCE_RETURN_POINT",
        description: "Fence return point. There can only be one fence return point.\n        ",
        param: {
          1: "Reserved",
          2: "Reserved",
          3: "Reserved",
          4: "Reserved",
          5: "Latitude",
          6: "Longitude",
          7: "Altitude"
        }
      },
      5001: {
        name: "NAV_FENCE_POLYGON_VERTEX_INCLUSION",
        description: "Fence vertex for an inclusion polygon (the polygon must not be self-intersecting). The vehicle must stay within this area. Minimum of 3 vertices required.\n        ",
        param: {
          1: "Polygon vertex count",
          2: "Reserved",
          3: "Reserved",
          4: "Reserved",
          5: "Latitude",
          6: "Longitude",
          7: "Reserved"
        }
      },
      5002: {
        name: "NAV_FENCE_POLYGON_VERTEX_EXCLUSION",
        description: "Fence vertex for an exclusion polygon (the polygon must not be self-intersecting). The vehicle must stay outside this area. Minimum of 3 vertices required.\n        ",
        param: {
          1: "Polygon vertex count",
          2: "Reserved",
          3: "Reserved",
          4: "Reserved",
          5: "Latitude",
          6: "Longitude",
          7: "Reserved"
        }
      },
      5003: {
        name: "NAV_FENCE_CIRCLE_INCLUSION",
        description: "Circular fence area. The vehicle must stay inside this area.\n        ",
        param: {
          1: "radius in meters",
          2: "Reserved",
          3: "Reserved",
          4: "Reserved",
          5: "Latitude",
          6: "Longitude",
          7: "Reserved"
        }
      },
      5004: {
        name: "NAV_FENCE_CIRCLE_EXCLUSION",
        description: "Circular fence area. The vehicle must stay outside this area.\n        ",
        param: {
          1: "radius in meters",
          2: "Reserved",
          3: "Reserved",
          4: "Reserved",
          5: "Latitude",
          6: "Longitude",
          7: "Reserved"
        }
      },
      5100: {
        name: "NAV_RALLY_POINT",
        description: "Rally point. You can have multiple rally points defined.\n        ",
        param: {
          1: "Reserved",
          2: "Reserved",
          3: "Reserved",
          4: "Reserved",
          5: "Latitude",
          6: "Longitude",
          7: "Altitude"
        }
      },
      5200: {
        name: "UAVCAN_GET_NODE_INFO",
        description: "Commands the vehicle to respond with a sequence of messages UAVCAN_NODE_INFO, one message per every UAVCAN node that is online. Note that some of the response messages can be lost, which the receiver can detect easily by checking whether every received UAVCAN_NODE_STATUS has a matching message UAVCAN_NODE_INFO received earlier; if not, this command should be sent again in order to request re-transmission of the node information messages.",
        param: {
          1: "Reserved (set to 0)",
          2: "Reserved (set to 0)",
          3: "Reserved (set to 0)",
          4: "Reserved (set to 0)",
          5: "Reserved (set to 0)",
          6: "Reserved (set to 0)",
          7: "Reserved (set to 0)"
        }
      },
      30001: {
        name: "PAYLOAD_PREPARE_DEPLOY",
        description: "Deploy payload on a Lat / Lon / Alt position. This includes the navigation to reach the required release position and velocity.",
        param: {
          1: "Operation mode. 0: prepare single payload deploy (overwriting previous requests), but do not execute it. 1: execute payload deploy immediately (rejecting further deploy commands during execution, but allowing abort). 2: add payload deploy to existing deployment list.",
          2: "Desired approach vector in degrees compass heading (0..360). A negative value indicates the system can define the approach vector at will.",
          3: "Desired ground speed at release time. This can be overridden by the airframe in case it needs to meet minimum airspeed. A negative value indicates the system can define the ground speed at will.",
          4: "Minimum altitude clearance to the release position in meters. A negative value indicates the system can define the clearance at will.",
          5: "Latitude unscaled for MISSION_ITEM or in 1e7 degrees for MISSION_ITEM_INT",
          6: "Longitude unscaled for MISSION_ITEM or in 1e7 degrees for MISSION_ITEM_INT",
          7: "Altitude (AMSL), in meters"
        }
      },
      30002: {
        name: "PAYLOAD_CONTROL_DEPLOY",
        description: "Control the payload deployment.",
        param: {
          1: "Operation mode. 0: Abort deployment, continue normal mission. 1: switch to payload deployment mode. 100: delete first payload deployment request. 101: delete all payload deployment requests.",
          2: "Reserved",
          3: "Reserved",
          4: "Reserved",
          5: "Reserved",
          6: "Reserved",
          7: "Reserved"
        }
      },
      31000: {
        name: "WAYPOINT_USER_1",
        description: "User defined waypoint item. Ground Station will show the Vehicle as flying through this item.",
        param: {
          1: "User defined",
          2: "User defined",
          3: "User defined",
          4: "User defined",
          5: "Latitude unscaled",
          6: "Longitude unscaled",
          7: "Altitude (AMSL), in meters"
        }
      },
      31001: {
        name: "WAYPOINT_USER_2",
        description: "User defined waypoint item. Ground Station will show the Vehicle as flying through this item.",
        param: {
          1: "User defined",
          2: "User defined",
          3: "User defined",
          4: "User defined",
          5: "Latitude unscaled",
          6: "Longitude unscaled",
          7: "Altitude (AMSL), in meters"
        }
      },
      31002: {
        name: "WAYPOINT_USER_3",
        description: "User defined waypoint item. Ground Station will show the Vehicle as flying through this item.",
        param: {
          1: "User defined",
          2: "User defined",
          3: "User defined",
          4: "User defined",
          5: "Latitude unscaled",
          6: "Longitude unscaled",
          7: "Altitude (AMSL), in meters"
        }
      },
      31003: {
        name: "WAYPOINT_USER_4",
        description: "User defined waypoint item. Ground Station will show the Vehicle as flying through this item.",
        param: {
          1: "User defined",
          2: "User defined",
          3: "User defined",
          4: "User defined",
          5: "Latitude unscaled",
          6: "Longitude unscaled",
          7: "Altitude (AMSL), in meters"
        }
      },
      31004: {
        name: "WAYPOINT_USER_5",
        description: "User defined waypoint item. Ground Station will show the Vehicle as flying through this item.",
        param: {
          1: "User defined",
          2: "User defined",
          3: "User defined",
          4: "User defined",
          5: "Latitude unscaled",
          6: "Longitude unscaled",
          7: "Altitude (AMSL), in meters"
        }
      },
      31005: {
        name: "SPATIAL_USER_1",
        description: "User defined spatial item. Ground Station will not show the Vehicle as flying through this item. Example: ROI item.",
        param: {
          1: "User defined",
          2: "User defined",
          3: "User defined",
          4: "User defined",
          5: "Latitude unscaled",
          6: "Longitude unscaled",
          7: "Altitude (AMSL), in meters"
        }
      },
      31006: {
        name: "SPATIAL_USER_2",
        description: "User defined spatial item. Ground Station will not show the Vehicle as flying through this item. Example: ROI item.",
        param: {
          1: "User defined",
          2: "User defined",
          3: "User defined",
          4: "User defined",
          5: "Latitude unscaled",
          6: "Longitude unscaled",
          7: "Altitude (AMSL), in meters"
        }
      },
      31007: {
        name: "SPATIAL_USER_3",
        description: "User defined spatial item. Ground Station will not show the Vehicle as flying through this item. Example: ROI item.",
        param: {
          1: "User defined",
          2: "User defined",
          3: "User defined",
          4: "User defined",
          5: "Latitude unscaled",
          6: "Longitude unscaled",
          7: "Altitude (AMSL), in meters"
        }
      },
      31008: {
        name: "SPATIAL_USER_4",
        description: "User defined spatial item. Ground Station will not show the Vehicle as flying through this item. Example: ROI item.",
        param: {
          1: "User defined",
          2: "User defined",
          3: "User defined",
          4: "User defined",
          5: "Latitude unscaled",
          6: "Longitude unscaled",
          7: "Altitude (AMSL), in meters"
        }
      },
      31009: {
        name: "SPATIAL_USER_5",
        description: "User defined spatial item. Ground Station will not show the Vehicle as flying through this item. Example: ROI item.",
        param: {
          1: "User defined",
          2: "User defined",
          3: "User defined",
          4: "User defined",
          5: "Latitude unscaled",
          6: "Longitude unscaled",
          7: "Altitude (AMSL), in meters"
        }
      },
      31010: {
        name: "USER_1",
        description: "User defined command. Ground Station will not show the Vehicle as flying through this item. Example: MAV_CMD_DO_SET_PARAMETER item.",
        param: {
          1: "User defined",
          2: "User defined",
          3: "User defined",
          4: "User defined",
          5: "User defined",
          6: "User defined",
          7: "User defined"
        }
      },
      31011: {
        name: "USER_2",
        description: "User defined command. Ground Station will not show the Vehicle as flying through this item. Example: MAV_CMD_DO_SET_PARAMETER item.",
        param: {
          1: "User defined",
          2: "User defined",
          3: "User defined",
          4: "User defined",
          5: "User defined",
          6: "User defined",
          7: "User defined"
        }
      },
      31012: {
        name: "USER_3",
        description: "User defined command. Ground Station will not show the Vehicle as flying through this item. Example: MAV_CMD_DO_SET_PARAMETER item.",
        param: {
          1: "User defined",
          2: "User defined",
          3: "User defined",
          4: "User defined",
          5: "User defined",
          6: "User defined",
          7: "User defined"
        }
      },
      31013: {
        name: "USER_4",
        description: "User defined command. Ground Station will not show the Vehicle as flying through this item. Example: MAV_CMD_DO_SET_PARAMETER item.",
        param: {
          1: "User defined",
          2: "User defined",
          3: "User defined",
          4: "User defined",
          5: "User defined",
          6: "User defined",
          7: "User defined"
        }
      },
      31014: {
        name: "USER_5",
        description: "User defined command. Ground Station will not show the Vehicle as flying through this item. Example: MAV_CMD_DO_SET_PARAMETER item.",
        param: {
          1: "User defined",
          2: "User defined",
          3: "User defined",
          4: "User defined",
          5: "User defined",
          6: "User defined",
          7: "User defined"
        }
      },
      42000: {
        name: "POWER_OFF_INITIATED",
        description: "A system wide power-off event has been initiated.",
        param: {
          1: "Empty.",
          2: "Empty.",
          3: "Empty.",
          4: "Empty.",
          5: "Empty.",
          6: "Empty.",
          7: "Empty."
        }
      },
      42001: {
        name: "SOLO_BTN_FLY_CLICK",
        description: "FLY button has been clicked.",
        param: {
          1: "Empty.",
          2: "Empty.",
          3: "Empty.",
          4: "Empty.",
          5: "Empty.",
          6: "Empty.",
          7: "Empty."
        }
      },
      42002: {
        name: "SOLO_BTN_FLY_HOLD",
        description: "FLY button has been held for 1.5 seconds.",
        param: {
          1: "Takeoff altitude.",
          2: "Empty.",
          3: "Empty.",
          4: "Empty.",
          5: "Empty.",
          6: "Empty.",
          7: "Empty."
        }
      },
      42003: {
        name: "SOLO_BTN_PAUSE_CLICK",
        description: "PAUSE button has been clicked.",
        param: {
          1: "1 if Solo is in a shot mode, 0 otherwise.",
          2: "Empty.",
          3: "Empty.",
          4: "Empty.",
          5: "Empty.",
          6: "Empty.",
          7: "Empty."
        }
      },
      42004: {
        name: "FIXED_MAG_CAL",
        description: "Magnetometer calibration based on fixed position\n        in earth field given by inclination, declination and intensity.",
        param: {
          1: "MagDeclinationDegrees.",
          2: "MagInclinationDegrees.",
          3: "MagIntensityMilliGauss.",
          4: "YawDegrees.",
          5: "Empty.",
          6: "Empty.",
          7: "Empty."
        }
      },
      42005: {
        name: "FIXED_MAG_CAL_FIELD",
        description: "Magnetometer calibration based on fixed expected field values in milliGauss.",
        param: {
          1: "FieldX.",
          2: "FieldY.",
          3: "FieldZ.",
          4: "Empty.",
          5: "Empty.",
          6: "Empty.",
          7: "Empty."
        }
      },
      42424: {
        name: "DO_START_MAG_CAL",
        description: "Initiate a magnetometer calibration.",
        param: {
          1: "uint8_t bitmask of magnetometers (0 means all).",
          2: "Automatically retry on failure (0=no retry, 1=retry).",
          3: "Save without user input (0=require input, 1=autosave).",
          4: "Delay (seconds).",
          5: "Autoreboot (0=user reboot, 1=autoreboot).",
          6: "Empty.",
          7: "Empty."
        }
      },
      42425: {
        name: "DO_ACCEPT_MAG_CAL",
        description: "Initiate a magnetometer calibration.",
        param: {
          1: "uint8_t bitmask of magnetometers (0 means all).",
          2: "Empty.",
          3: "Empty.",
          4: "Empty.",
          5: "Empty.",
          6: "Empty.",
          7: "Empty."
        }
      },
      42426: {
        name: "DO_CANCEL_MAG_CAL",
        description: "Cancel a running magnetometer calibration.",
        param: {
          1: "uint8_t bitmask of magnetometers (0 means all).",
          2: "Empty.",
          3: "Empty.",
          4: "Empty.",
          5: "Empty.",
          6: "Empty.",
          7: "Empty."
        }
      },
      42427: {
        name: "SET_FACTORY_TEST_MODE",
        description: "Command autopilot to get into factory test/diagnostic mode.",
        param: {
          1: "0 means get out of test mode, 1 means get into test mode.",
          2: "Empty.",
          3: "Empty.",
          4: "Empty.",
          5: "Empty.",
          6: "Empty.",
          7: "Empty."
        }
      },
      42428: {
        name: "DO_SEND_BANNER",
        description: "Reply with the version banner.",
        param: {
          1: "Empty.",
          2: "Empty.",
          3: "Empty.",
          4: "Empty.",
          5: "Empty.",
          6: "Empty.",
          7: "Empty."
        }
      },
      42429: {
        name: "ACCELCAL_VEHICLE_POS",
        description: "Used when doing accelerometer calibration. When sent to the GCS tells it what position to put the vehicle in. When sent to the vehicle says what position the vehicle is in.",
        param: {
          1: "Position, one of the ACCELCAL_VEHICLE_POS enum values.",
          2: "Empty.",
          3: "Empty.",
          4: "Empty.",
          5: "Empty.",
          6: "Empty.",
          7: "Empty."
        }
      },
      42501: {
        name: "GIMBAL_RESET",
        description: "Causes the gimbal to reset and boot as if it was just powered on.",
        param: {
          1: "Empty.",
          2: "Empty.",
          3: "Empty.",
          4: "Empty.",
          5: "Empty.",
          6: "Empty.",
          7: "Empty."
        }
      },
      42502: {
        name: "GIMBAL_AXIS_CALIBRATION_STATUS",
        description: "Reports progress and success or failure of gimbal axis calibration procedure.",
        param: {
          1: "Gimbal axis we're reporting calibration progress for.",
          2: "Current calibration progress for this axis, 0x64=100%.",
          3: "Status of the calibration.",
          4: "Empty.",
          5: "Empty.",
          6: "Empty.",
          7: "Empty."
        }
      },
      42503: {
        name: "GIMBAL_REQUEST_AXIS_CALIBRATION",
        description: "Starts commutation calibration on the gimbal.",
        param: {
          1: "Empty.",
          2: "Empty.",
          3: "Empty.",
          4: "Empty.",
          5: "Empty.",
          6: "Empty.",
          7: "Empty."
        }
      },
      42505: {
        name: "GIMBAL_FULL_RESET",
        description: "Erases gimbal application and parameters.",
        param: {
          1: "Magic number.",
          2: "Magic number.",
          3: "Magic number.",
          4: "Magic number.",
          5: "Magic number.",
          6: "Magic number.",
          7: "Magic number."
        }
      },
      42600: {
        name: "DO_WINCH",
        description: "Command to operate winch.",
        param: {
          1: "Winch number (0 for the default winch, otherwise a number from 1 to max number of winches on the vehicle).",
          2: "Action (0=relax, 1=relative length control, 2=rate control. See WINCH_ACTIONS enum.).",
          3: "Release length (cable distance to unwind in meters, negative numbers to wind in cable).",
          4: "Release rate (meters/second).",
          5: "Empty.",
          6: "Empty.",
          7: "Empty."
        }
      },
      42650: {
        name: "FLASH_BOOTLOADER",
        description: "Update the bootloader",
        param: {
          1: "Empty",
          2: "Empty",
          3: "Empty",
          4: "Empty",
          5: "Magic number - set to 290876 to actually flash",
          6: "Empty",
          7: "Empty"
        }
      }
    },
    LIMITS_STATE: {
      0: {
        name: "LIMITS_INIT",
        description: "Pre-initialization.",
        param: {}
      },
      1: {
        name: "LIMITS_DISABLED",
        description: "Disabled.",
        param: {}
      },
      2: {
        name: "LIMITS_ENABLED",
        description: "Checking limits.",
        param: {}
      },
      3: {
        name: "LIMITS_TRIGGERED",
        description: "A limit has been breached.",
        param: {}
      },
      4: {
        name: "LIMITS_RECOVERING",
        description: "Taking action e.g. Return/RTL.",
        param: {}
      },
      5: {
        name: "LIMITS_RECOVERED",
        description: "We're no longer in breach of a limit.",
        param: {}
      }
    },
    LIMIT_MODULE: {
      1: {
        name: "LIMIT_GPSLOCK",
        description: "Pre-initialization.",
        param: {}
      },
      2: {
        name: "LIMIT_GEOFENCE",
        description: "Disabled.",
        param: {}
      },
      4: {
        name: "LIMIT_ALTITUDE",
        description: "Checking limits.",
        param: {}
      }
    },
    RALLY_FLAGS: {
      1: {
        name: "FAVORABLE_WIND",
        description: "Flag set when requiring favorable winds for landing.",
        param: {}
      },
      2: {
        name: "LAND_IMMEDIATELY",
        description: "Flag set when plane is to immediately descend to break altitude and land without GCS intervention. Flag not set when plane is to loiter at Rally point until commanded to land.",
        param: {}
      }
    },
    PARACHUTE_ACTION: {
      0: {
        name: "PARACHUTE_DISABLE",
        description: "Disable parachute release.",
        param: {}
      },
      1: {
        name: "PARACHUTE_ENABLE",
        description: "Enable parachute release.",
        param: {}
      },
      2: {
        name: "PARACHUTE_RELEASE",
        description: "Release parachute.",
        param: {}
      }
    },
    GRIPPER_ACTIONS: {
      0: {
        name: "GRIPPER_ACTION_RELEASE",
        description: "Gripper release cargo.",
        param: {}
      },
      1: {
        name: "GRIPPER_ACTION_GRAB",
        description: "Gripper grab onto cargo.",
        param: {}
      }
    },
    WINCH_ACTIONS: {
      0: {
        name: "WINCH_RELAXED",
        description: "Relax winch.",
        param: {}
      },
      1: {
        name: "WINCH_RELATIVE_LENGTH_CONTROL",
        description: "Winch unwinds or winds specified length of cable optionally using specified rate.",
        param: {}
      },
      2: {
        name: "WINCH_RATE_CONTROL",
        description: "Winch unwinds or winds cable at specified rate in meters/seconds.",
        param: {}
      }
    },
    CAMERA_STATUS_TYPES: {
      0: {
        name: "CAMERA_STATUS_TYPE_HEARTBEAT",
        description: "Camera heartbeat, announce camera component ID at 1Hz.",
        param: {}
      },
      1: {
        name: "CAMERA_STATUS_TYPE_TRIGGER",
        description: "Camera image triggered.",
        param: {}
      },
      2: {
        name: "CAMERA_STATUS_TYPE_DISCONNECT",
        description: "Camera connection lost.",
        param: {}
      },
      3: {
        name: "CAMERA_STATUS_TYPE_ERROR",
        description: "Camera unknown error.",
        param: {}
      },
      4: {
        name: "CAMERA_STATUS_TYPE_LOWBATT",
        description: "Camera battery low. Parameter p1 shows reported voltage.",
        param: {}
      },
      5: {
        name: "CAMERA_STATUS_TYPE_LOWSTORE",
        description: "Camera storage low. Parameter p1 shows reported shots remaining.",
        param: {}
      },
      6: {
        name: "CAMERA_STATUS_TYPE_LOWSTOREV",
        description: "Camera storage low. Parameter p1 shows reported video minutes remaining.",
        param: {}
      }
    },
    CAMERA_FEEDBACK_FLAGS: {
      0: {
        name: "CAMERA_FEEDBACK_PHOTO",
        description: "Shooting photos, not video.",
        param: {}
      },
      1: {
        name: "CAMERA_FEEDBACK_VIDEO",
        description: "Shooting video, not stills.",
        param: {}
      },
      2: {
        name: "CAMERA_FEEDBACK_BADEXPOSURE",
        description: "Unable to achieve requested exposure (e.g. shutter speed too low).",
        param: {}
      },
      3: {
        name: "CAMERA_FEEDBACK_CLOSEDLOOP",
        description: "Closed loop feedback from camera, we know for sure it has successfully taken a picture.",
        param: {}
      },
      4: {
        name: "CAMERA_FEEDBACK_OPENLOOP",
        description: "Open loop camera, an image trigger has been requested but we can't know for sure it has successfully taken a picture.",
        param: {}
      }
    },
    MAV_MODE_GIMBAL: {
      0: {
        name: "UNINITIALIZED",
        description: "Gimbal is powered on but has not started initializing yet.",
        param: {}
      },
      1: {
        name: "CALIBRATING_PITCH",
        description: "Gimbal is currently running calibration on the pitch axis.",
        param: {}
      },
      2: {
        name: "CALIBRATING_ROLL",
        description: "Gimbal is currently running calibration on the roll axis.",
        param: {}
      },
      3: {
        name: "CALIBRATING_YAW",
        description: "Gimbal is currently running calibration on the yaw axis.",
        param: {}
      },
      4: {
        name: "INITIALIZED",
        description: "Gimbal has finished calibrating and initializing, but is relaxed pending reception of first rate command from copter.",
        param: {}
      },
      5: {
        name: "ACTIVE",
        description: "Gimbal is actively stabilizing.",
        param: {}
      },
      6: {
        name: "RATE_CMD_TIMEOUT",
        description: "Gimbal is relaxed because it missed more than 10 expected rate command messages in a row. Gimbal will move back to active mode when it receives a new rate command.",
        param: {}
      }
    },
    GIMBAL_AXIS: {
      0: {
        name: "YAW",
        description: "Gimbal yaw axis.",
        param: {}
      },
      1: {
        name: "PITCH",
        description: "Gimbal pitch axis.",
        param: {}
      },
      2: {
        name: "ROLL",
        description: "Gimbal roll axis.",
        param: {}
      }
    },
    GIMBAL_AXIS_CALIBRATION_STATUS: {
      0: {
        name: "IN_PROGRESS",
        description: "Axis calibration is in progress.",
        param: {}
      },
      1: {
        name: "SUCCEEDED",
        description: "Axis calibration succeeded.",
        param: {}
      },
      2: {
        name: "FAILED",
        description: "Axis calibration failed.",
        param: {}
      }
    },
    GIMBAL_AXIS_CALIBRATION_REQUIRED: {
      0: {
        name: "UNKNOWN",
        description: "Whether or not this axis requires calibration is unknown at this time.",
        param: {}
      },
      1: {
        name: "TRUE",
        description: "This axis requires calibration.",
        param: {}
      },
      2: {
        name: "FALSE",
        description: "This axis does not require calibration.",
        param: {}
      }
    },
    GOPRO_HEARTBEAT_STATUS: {
      0: {
        name: "DISCONNECTED",
        description: "No GoPro connected.",
        param: {}
      },
      1: {
        name: "INCOMPATIBLE",
        description: "The detected GoPro is not HeroBus compatible.",
        param: {}
      },
      2: {
        name: "CONNECTED",
        description: "A HeroBus compatible GoPro is connected.",
        param: {}
      },
      3: {
        name: "ERROR",
        description: "An unrecoverable error was encountered with the connected GoPro, it may require a power cycle.",
        param: {}
      }
    },
    GOPRO_HEARTBEAT_FLAGS: {
      1: {
        name: "GOPRO_FLAG_RECORDING",
        description: "GoPro is currently recording.",
        param: {}
      }
    },
    GOPRO_REQUEST_STATUS: {
      0: {
        name: "GOPRO_REQUEST_SUCCESS",
        description: "The write message with ID indicated succeeded.",
        param: {}
      },
      1: {
        name: "GOPRO_REQUEST_FAILED",
        description: "The write message with ID indicated failed.",
        param: {}
      }
    },
    GOPRO_COMMAND: {
      0: {
        name: "POWER",
        description: "(Get/Set).",
        param: {}
      },
      1: {
        name: "CAPTURE_MODE",
        description: "(Get/Set).",
        param: {}
      },
      2: {
        name: "SHUTTER",
        description: "(___/Set).",
        param: {}
      },
      3: {
        name: "BATTERY",
        description: "(Get/___).",
        param: {}
      },
      4: {
        name: "MODEL",
        description: "(Get/___).",
        param: {}
      },
      5: {
        name: "VIDEO_SETTINGS",
        description: "(Get/Set).",
        param: {}
      },
      6: {
        name: "LOW_LIGHT",
        description: "(Get/Set).",
        param: {}
      },
      7: {
        name: "PHOTO_RESOLUTION",
        description: "(Get/Set).",
        param: {}
      },
      8: {
        name: "PHOTO_BURST_RATE",
        description: "(Get/Set).",
        param: {}
      },
      9: {
        name: "PROTUNE",
        description: "(Get/Set).",
        param: {}
      },
      10: {
        name: "PROTUNE_WHITE_BALANCE",
        description: "(Get/Set) Hero 3+ Only.",
        param: {}
      },
      11: {
        name: "PROTUNE_COLOUR",
        description: "(Get/Set) Hero 3+ Only.",
        param: {}
      },
      12: {
        name: "PROTUNE_GAIN",
        description: "(Get/Set) Hero 3+ Only.",
        param: {}
      },
      13: {
        name: "PROTUNE_SHARPNESS",
        description: "(Get/Set) Hero 3+ Only.",
        param: {}
      },
      14: {
        name: "PROTUNE_EXPOSURE",
        description: "(Get/Set) Hero 3+ Only.",
        param: {}
      },
      15: {
        name: "TIME",
        description: "(Get/Set).",
        param: {}
      },
      16: {
        name: "CHARGING",
        description: "(Get/Set).",
        param: {}
      }
    },
    GOPRO_CAPTURE_MODE: {
      0: {
        name: "VIDEO",
        description: "Video mode.",
        param: {}
      },
      1: {
        name: "PHOTO",
        description: "Photo mode.",
        param: {}
      },
      2: {
        name: "BURST",
        description: "Burst mode, Hero 3+ only.",
        param: {}
      },
      3: {
        name: "TIME_LAPSE",
        description: "Time lapse mode, Hero 3+ only.",
        param: {}
      },
      4: {
        name: "MULTI_SHOT",
        description: "Multi shot mode, Hero 4 only.",
        param: {}
      },
      5: {
        name: "PLAYBACK",
        description: "Playback mode, Hero 4 only, silver only except when LCD or HDMI is connected to black.",
        param: {}
      },
      6: {
        name: "SETUP",
        description: "Playback mode, Hero 4 only.",
        param: {}
      },
      255: {
        name: "UNKNOWN",
        description: "Mode not yet known.",
        param: {}
      }
    },
    GOPRO_RESOLUTION: {
      0: {
        name: "480p",
        description: "848 x 480 (480p).",
        param: {}
      },
      1: {
        name: "720p",
        description: "1280 x 720 (720p).",
        param: {}
      },
      2: {
        name: "960p",
        description: "1280 x 960 (960p).",
        param: {}
      },
      3: {
        name: "1080p",
        description: "1920 x 1080 (1080p).",
        param: {}
      },
      4: {
        name: "1440p",
        description: "1920 x 1440 (1440p).",
        param: {}
      },
      5: {
        name: "2_7k_17_9",
        description: "2704 x 1440 (2.7k-17:9).",
        param: {}
      },
      6: {
        name: "2_7k_16_9",
        description: "2704 x 1524 (2.7k-16:9).",
        param: {}
      },
      7: {
        name: "2_7k_4_3",
        description: "2704 x 2028 (2.7k-4:3).",
        param: {}
      },
      8: {
        name: "4k_16_9",
        description: "3840 x 2160 (4k-16:9).",
        param: {}
      },
      9: {
        name: "4k_17_9",
        description: "4096 x 2160 (4k-17:9).",
        param: {}
      },
      10: {
        name: "720p_SUPERVIEW",
        description: "1280 x 720 (720p-SuperView).",
        param: {}
      },
      11: {
        name: "1080p_SUPERVIEW",
        description: "1920 x 1080 (1080p-SuperView).",
        param: {}
      },
      12: {
        name: "2_7k_SUPERVIEW",
        description: "2704 x 1520 (2.7k-SuperView).",
        param: {}
      },
      13: {
        name: "4k_SUPERVIEW",
        description: "3840 x 2160 (4k-SuperView).",
        param: {}
      }
    },
    GOPRO_FRAME_RATE: {
      0: {
        name: "12",
        description: "12 FPS.",
        param: {}
      },
      1: {
        name: "15",
        description: "15 FPS.",
        param: {}
      },
      2: {
        name: "24",
        description: "24 FPS.",
        param: {}
      },
      3: {
        name: "25",
        description: "25 FPS.",
        param: {}
      },
      4: {
        name: "30",
        description: "30 FPS.",
        param: {}
      },
      5: {
        name: "48",
        description: "48 FPS.",
        param: {}
      },
      6: {
        name: "50",
        description: "50 FPS.",
        param: {}
      },
      7: {
        name: "60",
        description: "60 FPS.",
        param: {}
      },
      8: {
        name: "80",
        description: "80 FPS.",
        param: {}
      },
      9: {
        name: "90",
        description: "90 FPS.",
        param: {}
      },
      10: {
        name: "100",
        description: "100 FPS.",
        param: {}
      },
      11: {
        name: "120",
        description: "120 FPS.",
        param: {}
      },
      12: {
        name: "240",
        description: "240 FPS.",
        param: {}
      },
      13: {
        name: "12_5",
        description: "12.5 FPS.",
        param: {}
      }
    },
    GOPRO_FIELD_OF_VIEW: {
      0: {
        name: "WIDE",
        description: "0x00: Wide.",
        param: {}
      },
      1: {
        name: "MEDIUM",
        description: "0x01: Medium.",
        param: {}
      },
      2: {
        name: "NARROW",
        description: "0x02: Narrow.",
        param: {}
      }
    },
    GOPRO_VIDEO_SETTINGS_FLAGS: {
      1: {
        name: "GOPRO_VIDEO_SETTINGS_TV_MODE",
        description: "0=NTSC, 1=PAL.",
        param: {}
      }
    },
    GOPRO_PHOTO_RESOLUTION: {
      0: {
        name: "5MP_MEDIUM",
        description: "5MP Medium.",
        param: {}
      },
      1: {
        name: "7MP_MEDIUM",
        description: "7MP Medium.",
        param: {}
      },
      2: {
        name: "7MP_WIDE",
        description: "7MP Wide.",
        param: {}
      },
      3: {
        name: "10MP_WIDE",
        description: "10MP Wide.",
        param: {}
      },
      4: {
        name: "12MP_WIDE",
        description: "12MP Wide.",
        param: {}
      }
    },
    GOPRO_PROTUNE_WHITE_BALANCE: {
      0: {
        name: "AUTO",
        description: "Auto.",
        param: {}
      },
      1: {
        name: "3000K",
        description: "3000K.",
        param: {}
      },
      2: {
        name: "5500K",
        description: "5500K.",
        param: {}
      },
      3: {
        name: "6500K",
        description: "6500K.",
        param: {}
      },
      4: {
        name: "RAW",
        description: "Camera Raw.",
        param: {}
      }
    },
    GOPRO_PROTUNE_COLOUR: {
      0: {
        name: "STANDARD",
        description: "Auto.",
        param: {}
      },
      1: {
        name: "NEUTRAL",
        description: "Neutral.",
        param: {}
      }
    },
    GOPRO_PROTUNE_GAIN: {
      0: {
        name: "400",
        description: "ISO 400.",
        param: {}
      },
      1: {
        name: "800",
        description: "ISO 800 (Only Hero 4).",
        param: {}
      },
      2: {
        name: "1600",
        description: "ISO 1600.",
        param: {}
      },
      3: {
        name: "3200",
        description: "ISO 3200 (Only Hero 4).",
        param: {}
      },
      4: {
        name: "6400",
        description: "ISO 6400.",
        param: {}
      }
    },
    GOPRO_PROTUNE_SHARPNESS: {
      0: {
        name: "LOW",
        description: "Low Sharpness.",
        param: {}
      },
      1: {
        name: "MEDIUM",
        description: "Medium Sharpness.",
        param: {}
      },
      2: {
        name: "HIGH",
        description: "High Sharpness.",
        param: {}
      }
    },
    GOPRO_PROTUNE_EXPOSURE: {
      0: {
        name: "NEG_5_0",
        description: "-5.0 EV (Hero 3+ Only).",
        param: {}
      },
      1: {
        name: "NEG_4_5",
        description: "-4.5 EV (Hero 3+ Only).",
        param: {}
      },
      2: {
        name: "NEG_4_0",
        description: "-4.0 EV (Hero 3+ Only).",
        param: {}
      },
      3: {
        name: "NEG_3_5",
        description: "-3.5 EV (Hero 3+ Only).",
        param: {}
      },
      4: {
        name: "NEG_3_0",
        description: "-3.0 EV (Hero 3+ Only).",
        param: {}
      },
      5: {
        name: "NEG_2_5",
        description: "-2.5 EV (Hero 3+ Only).",
        param: {}
      },
      6: {
        name: "NEG_2_0",
        description: "-2.0 EV.",
        param: {}
      },
      7: {
        name: "NEG_1_5",
        description: "-1.5 EV.",
        param: {}
      },
      8: {
        name: "NEG_1_0",
        description: "-1.0 EV.",
        param: {}
      },
      9: {
        name: "NEG_0_5",
        description: "-0.5 EV.",
        param: {}
      },
      10: {
        name: "ZERO",
        description: "0.0 EV.",
        param: {}
      },
      11: {
        name: "POS_0_5",
        description: "+0.5 EV.",
        param: {}
      },
      12: {
        name: "POS_1_0",
        description: "+1.0 EV.",
        param: {}
      },
      13: {
        name: "POS_1_5",
        description: "+1.5 EV.",
        param: {}
      },
      14: {
        name: "POS_2_0",
        description: "+2.0 EV.",
        param: {}
      },
      15: {
        name: "POS_2_5",
        description: "+2.5 EV (Hero 3+ Only).",
        param: {}
      },
      16: {
        name: "POS_3_0",
        description: "+3.0 EV (Hero 3+ Only).",
        param: {}
      },
      17: {
        name: "POS_3_5",
        description: "+3.5 EV (Hero 3+ Only).",
        param: {}
      },
      18: {
        name: "POS_4_0",
        description: "+4.0 EV (Hero 3+ Only).",
        param: {}
      },
      19: {
        name: "POS_4_5",
        description: "+4.5 EV (Hero 3+ Only).",
        param: {}
      },
      20: {
        name: "POS_5_0",
        description: "+5.0 EV (Hero 3+ Only).",
        param: {}
      }
    },
    GOPRO_CHARGING: {
      0: {
        name: "DISABLED",
        description: "Charging disabled.",
        param: {}
      },
      1: {
        name: "ENABLED",
        description: "Charging enabled.",
        param: {}
      }
    },
    GOPRO_MODEL: {
      0: {
        name: "UNKNOWN",
        description: "Unknown gopro model.",
        param: {}
      },
      1: {
        name: "HERO_3_PLUS_SILVER",
        description: "Hero 3+ Silver (HeroBus not supported by GoPro).",
        param: {}
      },
      2: {
        name: "HERO_3_PLUS_BLACK",
        description: "Hero 3+ Black.",
        param: {}
      },
      3: {
        name: "HERO_4_SILVER",
        description: "Hero 4 Silver.",
        param: {}
      },
      4: {
        name: "HERO_4_BLACK",
        description: "Hero 4 Black.",
        param: {}
      }
    },
    GOPRO_BURST_RATE: {
      0: {
        name: "3_IN_1_SECOND",
        description: "3 Shots / 1 Second.",
        param: {}
      },
      1: {
        name: "5_IN_1_SECOND",
        description: "5 Shots / 1 Second.",
        param: {}
      },
      2: {
        name: "10_IN_1_SECOND",
        description: "10 Shots / 1 Second.",
        param: {}
      },
      3: {
        name: "10_IN_2_SECOND",
        description: "10 Shots / 2 Second.",
        param: {}
      },
      4: {
        name: "10_IN_3_SECOND",
        description: "10 Shots / 3 Second (Hero 4 Only).",
        param: {}
      },
      5: {
        name: "30_IN_1_SECOND",
        description: "30 Shots / 1 Second.",
        param: {}
      },
      6: {
        name: "30_IN_2_SECOND",
        description: "30 Shots / 2 Second.",
        param: {}
      },
      7: {
        name: "30_IN_3_SECOND",
        description: "30 Shots / 3 Second.",
        param: {}
      },
      8: {
        name: "30_IN_6_SECOND",
        description: "30 Shots / 6 Second.",
        param: {}
      }
    },
    LED_CONTROL_PATTERN: {
      0: {
        name: "OFF",
        description: "LED patterns off (return control to regular vehicle control).",
        param: {}
      },
      1: {
        name: "FIRMWAREUPDATE",
        description: "LEDs show pattern during firmware update.",
        param: {}
      },
      255: {
        name: "CUSTOM",
        description: "Custom Pattern using custom bytes fields.",
        param: {}
      }
    },
    EKF_STATUS_FLAGS: {
      1: {
        name: "EKF_ATTITUDE",
        description: "Set if EKF's attitude estimate is good.",
        param: {}
      },
      2: {
        name: "EKF_VELOCITY_HORIZ",
        description: "Set if EKF's horizontal velocity estimate is good.",
        param: {}
      },
      4: {
        name: "EKF_VELOCITY_VERT",
        description: "Set if EKF's vertical velocity estimate is good.",
        param: {}
      },
      8: {
        name: "EKF_POS_HORIZ_REL",
        description: "Set if EKF's horizontal position (relative) estimate is good.",
        param: {}
      },
      16: {
        name: "EKF_POS_HORIZ_ABS",
        description: "Set if EKF's horizontal position (absolute) estimate is good.",
        param: {}
      },
      32: {
        name: "EKF_POS_VERT_ABS",
        description: "Set if EKF's vertical position (absolute) estimate is good.",
        param: {}
      },
      64: {
        name: "EKF_POS_VERT_AGL",
        description: "Set if EKF's vertical position (above ground) estimate is good.",
        param: {}
      },
      128: {
        name: "EKF_CONST_POS_MODE",
        description: "EKF is in constant position mode and does not know it's absolute or relative position.",
        param: {}
      },
      256: {
        name: "EKF_PRED_POS_HORIZ_REL",
        description: "Set if EKF's predicted horizontal position (relative) estimate is good.",
        param: {}
      },
      512: {
        name: "EKF_PRED_POS_HORIZ_ABS",
        description: "Set if EKF's predicted horizontal position (absolute) estimate is good.",
        param: {}
      }
    },
    PID_TUNING_AXIS: {
      1: {
        name: "PID_TUNING_ROLL",
        description: "",
        param: {}
      },
      2: {
        name: "PID_TUNING_PITCH",
        description: "",
        param: {}
      },
      3: {
        name: "PID_TUNING_YAW",
        description: "",
        param: {}
      },
      4: {
        name: "PID_TUNING_ACCZ",
        description: "",
        param: {}
      },
      5: {
        name: "PID_TUNING_STEER",
        description: "",
        param: {}
      },
      6: {
        name: "PID_TUNING_LANDING",
        description: "",
        param: {}
      }
    },
    MAG_CAL_STATUS: {
      0: {
        name: "MAG_CAL_NOT_STARTED",
        description: "",
        param: {}
      },
      1: {
        name: "MAG_CAL_WAITING_TO_START",
        description: "",
        param: {}
      },
      2: {
        name: "MAG_CAL_RUNNING_STEP_ONE",
        description: "",
        param: {}
      },
      3: {
        name: "MAG_CAL_RUNNING_STEP_TWO",
        description: "",
        param: {}
      },
      4: {
        name: "MAG_CAL_SUCCESS",
        description: "",
        param: {}
      },
      5: {
        name: "MAG_CAL_FAILED",
        description: "",
        param: {}
      },
      6: {
        name: "MAG_CAL_BAD_ORIENTATION",
        description: "",
        param: {}
      }
    },
    MAV_REMOTE_LOG_DATA_BLOCK_COMMANDS: {
      2147483645: {
        name: "MAV_REMOTE_LOG_DATA_BLOCK_STOP",
        description: "UAV to stop sending DataFlash blocks.",
        param: {}
      },
      2147483646: {
        name: "MAV_REMOTE_LOG_DATA_BLOCK_START",
        description: "UAV to start sending DataFlash blocks.",
        param: {}
      }
    },
    MAV_REMOTE_LOG_DATA_BLOCK_STATUSES: {
      0: {
        name: "MAV_REMOTE_LOG_DATA_BLOCK_NACK",
        description: "This block has NOT been received.",
        param: {}
      },
      1: {
        name: "MAV_REMOTE_LOG_DATA_BLOCK_ACK",
        description: "This block has been received.",
        param: {}
      }
    },
    DEVICE_OP_BUSTYPE: {
      0: {
        name: "I2C",
        description: "I2C Device operation.",
        param: {}
      },
      1: {
        name: "SPI",
        description: "SPI Device operation.",
        param: {}
      }
    },
    DEEPSTALL_STAGE: {
      0: {
        name: "FLY_TO_LANDING",
        description: "Flying to the landing point.",
        param: {}
      },
      1: {
        name: "ESTIMATE_WIND",
        description: "Building an estimate of the wind.",
        param: {}
      },
      2: {
        name: "WAIT_FOR_BREAKOUT",
        description: "Waiting to breakout of the loiter to fly the approach.",
        param: {}
      },
      3: {
        name: "FLY_TO_ARC",
        description: "Flying to the first arc point to turn around to the landing point.",
        param: {}
      },
      4: {
        name: "ARC",
        description: "Turning around back to the deepstall landing point.",
        param: {}
      },
      5: {
        name: "APPROACH",
        description: "Approaching the landing point.",
        param: {}
      },
      6: {
        name: "LAND",
        description: "Stalling and steering towards the land point.",
        param: {}
      }
    },
    PLANE_MODE: {
      0: {
        name: "MANUAL",
        description: "",
        param: {}
      },
      1: {
        name: "CIRCLE",
        description: "",
        param: {}
      },
      2: {
        name: "STABILIZE",
        description: "",
        param: {}
      },
      3: {
        name: "TRAINING",
        description: "",
        param: {}
      },
      4: {
        name: "ACRO",
        description: "",
        param: {}
      },
      5: {
        name: "FLY_BY_WIRE_A",
        description: "",
        param: {}
      },
      6: {
        name: "FLY_BY_WIRE_B",
        description: "",
        param: {}
      },
      7: {
        name: "CRUISE",
        description: "",
        param: {}
      },
      8: {
        name: "AUTOTUNE",
        description: "",
        param: {}
      },
      10: {
        name: "AUTO",
        description: "",
        param: {}
      },
      11: {
        name: "RTL",
        description: "",
        param: {}
      },
      12: {
        name: "LOITER",
        description: "",
        param: {}
      },
      14: {
        name: "AVOID_ADSB",
        description: "",
        param: {}
      },
      15: {
        name: "GUIDED",
        description: "",
        param: {}
      },
      16: {
        name: "INITIALIZING",
        description: "",
        param: {}
      },
      17: {
        name: "QSTABILIZE",
        description: "",
        param: {}
      },
      18: {
        name: "QHOVER",
        description: "",
        param: {}
      },
      19: {
        name: "QLOITER",
        description: "",
        param: {}
      },
      20: {
        name: "QLAND",
        description: "",
        param: {}
      },
      21: {
        name: "QRTL",
        description: "",
        param: {}
      },
      22: {
        name: "QAUTOTUNE",
        description: "",
        param: {}
      }
    },
    COPTER_MODE: {
      0: {
        name: "STABILIZE",
        description: "",
        param: {}
      },
      1: {
        name: "ACRO",
        description: "",
        param: {}
      },
      2: {
        name: "ALT_HOLD",
        description: "",
        param: {}
      },
      3: {
        name: "AUTO",
        description: "",
        param: {}
      },
      4: {
        name: "GUIDED",
        description: "",
        param: {}
      },
      5: {
        name: "LOITER",
        description: "",
        param: {}
      },
      6: {
        name: "RTL",
        description: "",
        param: {}
      },
      7: {
        name: "CIRCLE",
        description: "",
        param: {}
      },
      9: {
        name: "LAND",
        description: "",
        param: {}
      },
      11: {
        name: "DRIFT",
        description: "",
        param: {}
      },
      13: {
        name: "SPORT",
        description: "",
        param: {}
      },
      14: {
        name: "FLIP",
        description: "",
        param: {}
      },
      15: {
        name: "AUTOTUNE",
        description: "",
        param: {}
      },
      16: {
        name: "POSHOLD",
        description: "",
        param: {}
      },
      17: {
        name: "BRAKE",
        description: "",
        param: {}
      },
      18: {
        name: "THROW",
        description: "",
        param: {}
      },
      19: {
        name: "AVOID_ADSB",
        description: "",
        param: {}
      },
      20: {
        name: "GUIDED_NOGPS",
        description: "",
        param: {}
      },
      21: {
        name: "SMART_RTL",
        description: "",
        param: {}
      }
    },
    SUB_MODE: {
      0: {
        name: "STABILIZE",
        description: "",
        param: {}
      },
      1: {
        name: "ACRO",
        description: "",
        param: {}
      },
      2: {
        name: "ALT_HOLD",
        description: "",
        param: {}
      },
      3: {
        name: "AUTO",
        description: "",
        param: {}
      },
      4: {
        name: "GUIDED",
        description: "",
        param: {}
      },
      7: {
        name: "CIRCLE",
        description: "",
        param: {}
      },
      9: {
        name: "SURFACE",
        description: "",
        param: {}
      },
      16: {
        name: "POSHOLD",
        description: "",
        param: {}
      },
      19: {
        name: "MANUAL",
        description: "",
        param: {}
      }
    },
    ROVER_MODE: {
      0: {
        name: "MANUAL",
        description: "",
        param: {}
      },
      1: {
        name: "ACRO",
        description: "",
        param: {}
      },
      3: {
        name: "STEERING",
        description: "",
        param: {}
      },
      4: {
        name: "HOLD",
        description: "",
        param: {}
      },
      5: {
        name: "LOITER",
        description: "",
        param: {}
      },
      10: {
        name: "AUTO",
        description: "",
        param: {}
      },
      11: {
        name: "RTL",
        description: "",
        param: {}
      },
      12: {
        name: "SMART_RTL",
        description: "",
        param: {}
      },
      15: {
        name: "GUIDED",
        description: "",
        param: {}
      },
      16: {
        name: "INITIALIZING",
        description: "",
        param: {}
      }
    },
    TRACKER_MODE: {
      0: {
        name: "MANUAL",
        description: "",
        param: {}
      },
      1: {
        name: "STOP",
        description: "",
        param: {}
      },
      2: {
        name: "SCAN",
        description: "",
        param: {}
      },
      3: {
        name: "SERVO_TEST",
        description: "",
        param: {}
      },
      10: {
        name: "AUTO",
        description: "",
        param: {}
      },
      16: {
        name: "INITIALIZING",
        description: "",
        param: {}
      }
    },
    MAV_AUTOPILOT: {
      0: {
        name: "GENERIC",
        description: "Generic autopilot, full support for everything",
        param: {}
      },
      1: {
        name: "RESERVED",
        description: "Reserved for future use.",
        param: {}
      },
      2: {
        name: "SLUGS",
        description: "SLUGS autopilot, http://slugsuav.soe.ucsc.edu",
        param: {}
      },
      3: {
        name: "ARDUPILOTMEGA",
        description: "ArduPilot - Plane/Copter/Rover/Sub/Tracker, http://ardupilot.org",
        param: {}
      },
      4: {
        name: "OPENPILOT",
        description: "OpenPilot, http://openpilot.org",
        param: {}
      },
      5: {
        name: "GENERIC_WAYPOINTS_ONLY",
        description: "Generic autopilot only supporting simple waypoints",
        param: {}
      },
      6: {
        name: "GENERIC_WAYPOINTS_AND_SIMPLE_NAVIGATION_ONLY",
        description: "Generic autopilot supporting waypoints and other simple navigation commands",
        param: {}
      },
      7: {
        name: "GENERIC_MISSION_FULL",
        description: "Generic autopilot supporting the full mission command set",
        param: {}
      },
      8: {
        name: "INVALID",
        description: "No valid autopilot, e.g. a GCS or other MAVLink component",
        param: {}
      },
      9: {
        name: "PPZ",
        description: "PPZ UAV - http://nongnu.org/paparazzi",
        param: {}
      },
      10: {
        name: "UDB",
        description: "UAV Dev Board",
        param: {}
      },
      11: {
        name: "FP",
        description: "FlexiPilot",
        param: {}
      },
      12: {
        name: "PX4",
        description: "PX4 Autopilot - http://px4.io/",
        param: {}
      },
      13: {
        name: "SMACCMPILOT",
        description: "SMACCMPilot - http://smaccmpilot.org",
        param: {}
      },
      14: {
        name: "AUTOQUAD",
        description: "AutoQuad -- http://autoquad.org",
        param: {}
      },
      15: {
        name: "ARMAZILA",
        description: "Armazila -- http://armazila.com",
        param: {}
      },
      16: {
        name: "AEROB",
        description: "Aerob -- http://aerob.ru",
        param: {}
      },
      17: {
        name: "ASLUAV",
        description: "ASLUAV autopilot -- http://www.asl.ethz.ch",
        param: {}
      },
      18: {
        name: "SMARTAP",
        description: "SmartAP Autopilot - http://sky-drones.com",
        param: {}
      },
      19: {
        name: "AIRRAILS",
        description: "AirRails - http://uaventure.com",
        param: {}
      }
    },
    MAV_TYPE: {
      0: {
        name: "GENERIC",
        description: "Generic micro air vehicle.",
        param: {}
      },
      1: {
        name: "FIXED_WING",
        description: "Fixed wing aircraft.",
        param: {}
      },
      2: {
        name: "QUADROTOR",
        description: "Quadrotor",
        param: {}
      },
      3: {
        name: "COAXIAL",
        description: "Coaxial helicopter",
        param: {}
      },
      4: {
        name: "HELICOPTER",
        description: "Normal helicopter with tail rotor.",
        param: {}
      },
      5: {
        name: "ANTENNA_TRACKER",
        description: "Ground installation",
        param: {}
      },
      6: {
        name: "GCS",
        description: "Operator control unit / ground control station",
        param: {}
      },
      7: {
        name: "AIRSHIP",
        description: "Airship, controlled",
        param: {}
      },
      8: {
        name: "FREE_BALLOON",
        description: "Free balloon, uncontrolled",
        param: {}
      },
      9: {
        name: "ROCKET",
        description: "Rocket",
        param: {}
      },
      10: {
        name: "GROUND_ROVER",
        description: "Ground rover",
        param: {}
      },
      11: {
        name: "SURFACE_BOAT",
        description: "Surface vessel, boat, ship",
        param: {}
      },
      12: {
        name: "SUBMARINE",
        description: "Submarine",
        param: {}
      },
      13: {
        name: "HEXAROTOR",
        description: "Hexarotor",
        param: {}
      },
      14: {
        name: "OCTOROTOR",
        description: "Octorotor",
        param: {}
      },
      15: {
        name: "TRICOPTER",
        description: "Tricopter",
        param: {}
      },
      16: {
        name: "FLAPPING_WING",
        description: "Flapping wing",
        param: {}
      },
      17: {
        name: "KITE",
        description: "Kite",
        param: {}
      },
      18: {
        name: "ONBOARD_CONTROLLER",
        description: "Onboard companion controller",
        param: {}
      },
      19: {
        name: "VTOL_DUOROTOR",
        description: "Two-rotor VTOL using control surfaces in vertical operation in addition. Tailsitter.",
        param: {}
      },
      20: {
        name: "VTOL_QUADROTOR",
        description: "Quad-rotor VTOL using a V-shaped quad config in vertical operation. Tailsitter.",
        param: {}
      },
      21: {
        name: "VTOL_TILTROTOR",
        description: "Tiltrotor VTOL",
        param: {}
      },
      22: {
        name: "VTOL_RESERVED2",
        description: "VTOL reserved 2",
        param: {}
      },
      23: {
        name: "VTOL_RESERVED3",
        description: "VTOL reserved 3",
        param: {}
      },
      24: {
        name: "VTOL_RESERVED4",
        description: "VTOL reserved 4",
        param: {}
      },
      25: {
        name: "VTOL_RESERVED5",
        description: "VTOL reserved 5",
        param: {}
      },
      26: {
        name: "GIMBAL",
        description: "Onboard gimbal",
        param: {}
      },
      27: {
        name: "ADSB",
        description: "Onboard ADSB peripheral",
        param: {}
      },
      28: {
        name: "PARAFOIL",
        description: "Steerable, nonrigid airfoil",
        param: {}
      },
      29: {
        name: "DODECAROTOR",
        description: "Dodecarotor",
        param: {}
      },
      30: {
        name: "CAMERA",
        description: "Camera",
        param: {}
      },
      31: {
        name: "CHARGING_STATION",
        description: "Charging station",
        param: {}
      },
      32: {
        name: "FLARM",
        description: "Onboard FLARM collision avoidance system",
        param: {}
      }
    },
    FIRMWARE_VERSION_TYPE: {
      0: {
        name: "DEV",
        description: "development release",
        param: {}
      },
      64: {
        name: "ALPHA",
        description: "alpha release",
        param: {}
      },
      128: {
        name: "BETA",
        description: "beta release",
        param: {}
      },
      192: {
        name: "RC",
        description: "release candidate",
        param: {}
      },
      255: {
        name: "OFFICIAL",
        description: "official stable release",
        param: {}
      }
    },
    MAV_MODE_FLAG: {
      1: {
        name: "CUSTOM_MODE_ENABLED",
        description: "0b00000001 Reserved for future use.",
        param: {}
      },
      2: {
        name: "TEST_ENABLED",
        description: "0b00000010 system has a test mode enabled. This flag is intended for temporary system tests and should not be used for stable implementations.",
        param: {}
      },
      4: {
        name: "AUTO_ENABLED",
        description: "0b00000100 autonomous mode enabled, system finds its own goal positions. Guided flag can be set or not, depends on the actual implementation.",
        param: {}
      },
      8: {
        name: "GUIDED_ENABLED",
        description: "0b00001000 guided mode enabled, system flies waypoints / mission items.",
        param: {}
      },
      16: {
        name: "STABILIZE_ENABLED",
        description: "0b00010000 system stabilizes electronically its attitude (and optionally position). It needs however further control inputs to move around.",
        param: {}
      },
      32: {
        name: "HIL_ENABLED",
        description: "0b00100000 hardware in the loop simulation. All motors / actuators are blocked, but internal software is full operational.",
        param: {}
      },
      64: {
        name: "MANUAL_INPUT_ENABLED",
        description: "0b01000000 remote control input is enabled.",
        param: {}
      },
      128: {
        name: "SAFETY_ARMED",
        description: "0b10000000 MAV safety set to armed. Motors are enabled / running / can start. Ready to fly. Additional note: this flag is to be ignore when sent in the command MAV_CMD_DO_SET_MODE and MAV_CMD_COMPONENT_ARM_DISARM shall be used instead. The flag can still be used to report the armed state.",
        param: {}
      }
    },
    MAV_MODE_FLAG_DECODE_POSITION: {
      1: {
        name: "CUSTOM_MODE",
        description: "Eighth bit: 00000001",
        param: {}
      },
      2: {
        name: "TEST",
        description: "Seventh bit: 00000010",
        param: {}
      },
      4: {
        name: "AUTO",
        description: "Sixt bit:   00000100",
        param: {}
      },
      8: {
        name: "GUIDED",
        description: "Fifth bit:  00001000",
        param: {}
      },
      16: {
        name: "STABILIZE",
        description: "Fourth bit: 00010000",
        param: {}
      },
      32: {
        name: "HIL",
        description: "Third bit:  00100000",
        param: {}
      },
      64: {
        name: "MANUAL",
        description: "Second bit: 01000000",
        param: {}
      },
      128: {
        name: "SAFETY",
        description: "First bit:  10000000",
        param: {}
      }
    },
    MAV_GOTO: {
      0: {
        name: "DO_HOLD",
        description: "Hold at the current position.",
        param: {}
      },
      1: {
        name: "DO_CONTINUE",
        description: "Continue with the next item in mission execution.",
        param: {}
      },
      2: {
        name: "HOLD_AT_CURRENT_POSITION",
        description: "Hold at the current position of the system",
        param: {}
      },
      3: {
        name: "HOLD_AT_SPECIFIED_POSITION",
        description: "Hold at the position specified in the parameters of the DO_HOLD action",
        param: {}
      }
    },
    MAV_MODE: {
      0: {
        name: "PREFLIGHT",
        description: "System is not ready to fly, booting, calibrating, etc. No flag is set.",
        param: {}
      },
      64: {
        name: "MANUAL_DISARMED",
        description: "System is allowed to be active, under manual (RC) control, no stabilization",
        param: {}
      },
      66: {
        name: "TEST_DISARMED",
        description: "UNDEFINED mode. This solely depends on the autopilot - use with caution, intended for developers only.",
        param: {}
      },
      80: {
        name: "STABILIZE_DISARMED",
        description: "System is allowed to be active, under assisted RC control.",
        param: {}
      },
      88: {
        name: "GUIDED_DISARMED",
        description: "System is allowed to be active, under autonomous control, manual setpoint",
        param: {}
      },
      92: {
        name: "AUTO_DISARMED",
        description: "System is allowed to be active, under autonomous control and navigation (the trajectory is decided onboard and not pre-programmed by waypoints)",
        param: {}
      },
      192: {
        name: "MANUAL_ARMED",
        description: "System is allowed to be active, under manual (RC) control, no stabilization",
        param: {}
      },
      194: {
        name: "TEST_ARMED",
        description: "UNDEFINED mode. This solely depends on the autopilot - use with caution, intended for developers only.",
        param: {}
      },
      208: {
        name: "STABILIZE_ARMED",
        description: "System is allowed to be active, under assisted RC control.",
        param: {}
      },
      216: {
        name: "GUIDED_ARMED",
        description: "System is allowed to be active, under autonomous control, manual setpoint",
        param: {}
      },
      220: {
        name: "AUTO_ARMED",
        description: "System is allowed to be active, under autonomous control and navigation (the trajectory is decided onboard and not pre-programmed by waypoints)",
        param: {}
      }
    },
    MAV_STATE: {
      0: {
        name: "UNINIT",
        description: "Uninitialized system, state is unknown.",
        param: {}
      },
      1: {
        name: "BOOT",
        description: "System is booting up.",
        param: {}
      },
      2: {
        name: "CALIBRATING",
        description: "System is calibrating and not flight-ready.",
        param: {}
      },
      3: {
        name: "STANDBY",
        description: "System is grounded and on standby. It can be launched any time.",
        param: {}
      },
      4: {
        name: "ACTIVE",
        description: "System is active and might be already airborne. Motors are engaged.",
        param: {}
      },
      5: {
        name: "CRITICAL",
        description: "System is in a non-normal flight mode. It can however still navigate.",
        param: {}
      },
      6: {
        name: "EMERGENCY",
        description: "System is in a non-normal flight mode. It lost control over parts or over the whole airframe. It is in mayday and going down.",
        param: {}
      },
      7: {
        name: "POWEROFF",
        description: "System just initialized its power-down sequence, will shut down now.",
        param: {}
      },
      8: {
        name: "FLIGHT_TERMINATION",
        description: "System is terminating itself.",
        param: {}
      }
    },
    MAV_COMPONENT: {
      0: {
        name: "MAV_COMP_ID_ALL",
        description: "",
        param: {}
      },
      1: {
        name: "MAV_COMP_ID_AUTOPILOT1",
        description: "",
        param: {}
      },
      100: {
        name: "MAV_COMP_ID_CAMERA",
        description: "",
        param: {}
      },
      101: {
        name: "MAV_COMP_ID_CAMERA2",
        description: "",
        param: {}
      },
      102: {
        name: "MAV_COMP_ID_CAMERA3",
        description: "",
        param: {}
      },
      103: {
        name: "MAV_COMP_ID_CAMERA4",
        description: "",
        param: {}
      },
      104: {
        name: "MAV_COMP_ID_CAMERA5",
        description: "",
        param: {}
      },
      105: {
        name: "MAV_COMP_ID_CAMERA6",
        description: "",
        param: {}
      },
      140: {
        name: "MAV_COMP_ID_SERVO1",
        description: "",
        param: {}
      },
      141: {
        name: "MAV_COMP_ID_SERVO2",
        description: "",
        param: {}
      },
      142: {
        name: "MAV_COMP_ID_SERVO3",
        description: "",
        param: {}
      },
      143: {
        name: "MAV_COMP_ID_SERVO4",
        description: "",
        param: {}
      },
      144: {
        name: "MAV_COMP_ID_SERVO5",
        description: "",
        param: {}
      },
      145: {
        name: "MAV_COMP_ID_SERVO6",
        description: "",
        param: {}
      },
      146: {
        name: "MAV_COMP_ID_SERVO7",
        description: "",
        param: {}
      },
      147: {
        name: "MAV_COMP_ID_SERVO8",
        description: "",
        param: {}
      },
      148: {
        name: "MAV_COMP_ID_SERVO9",
        description: "",
        param: {}
      },
      149: {
        name: "MAV_COMP_ID_SERVO10",
        description: "",
        param: {}
      },
      150: {
        name: "MAV_COMP_ID_SERVO11",
        description: "",
        param: {}
      },
      151: {
        name: "MAV_COMP_ID_SERVO12",
        description: "",
        param: {}
      },
      152: {
        name: "MAV_COMP_ID_SERVO13",
        description: "",
        param: {}
      },
      153: {
        name: "MAV_COMP_ID_SERVO14",
        description: "",
        param: {}
      },
      154: {
        name: "MAV_COMP_ID_GIMBAL",
        description: "",
        param: {}
      },
      155: {
        name: "MAV_COMP_ID_LOG",
        description: "",
        param: {}
      },
      156: {
        name: "MAV_COMP_ID_ADSB",
        description: "",
        param: {}
      },
      157: {
        name: "MAV_COMP_ID_OSD",
        description: "On Screen Display (OSD) devices for video links",
        param: {}
      },
      158: {
        name: "MAV_COMP_ID_PERIPHERAL",
        description: "Generic autopilot peripheral component ID. Meant for devices that do not implement the parameter sub-protocol",
        param: {}
      },
      159: {
        name: "MAV_COMP_ID_QX1_GIMBAL",
        description: "",
        param: {}
      },
      160: {
        name: "MAV_COMP_ID_FLARM",
        description: "",
        param: {}
      },
      180: {
        name: "MAV_COMP_ID_MAPPER",
        description: "",
        param: {}
      },
      190: {
        name: "MAV_COMP_ID_MISSIONPLANNER",
        description: "",
        param: {}
      },
      195: {
        name: "MAV_COMP_ID_PATHPLANNER",
        description: "",
        param: {}
      },
      200: {
        name: "MAV_COMP_ID_IMU",
        description: "",
        param: {}
      },
      201: {
        name: "MAV_COMP_ID_IMU_2",
        description: "",
        param: {}
      },
      202: {
        name: "MAV_COMP_ID_IMU_3",
        description: "",
        param: {}
      },
      220: {
        name: "MAV_COMP_ID_GPS",
        description: "",
        param: {}
      },
      221: {
        name: "MAV_COMP_ID_GPS2",
        description: "",
        param: {}
      },
      240: {
        name: "MAV_COMP_ID_UDP_BRIDGE",
        description: "",
        param: {}
      },
      241: {
        name: "MAV_COMP_ID_UART_BRIDGE",
        description: "",
        param: {}
      },
      250: {
        name: "MAV_COMP_ID_SYSTEM_CONTROL",
        description: "",
        param: {}
      }
    },
    MAV_SYS_STATUS_SENSOR: {
      1: {
        name: "3D_GYRO",
        description: "0x01 3D gyro",
        param: {}
      },
      2: {
        name: "3D_ACCEL",
        description: "0x02 3D accelerometer",
        param: {}
      },
      4: {
        name: "3D_MAG",
        description: "0x04 3D magnetometer",
        param: {}
      },
      8: {
        name: "ABSOLUTE_PRESSURE",
        description: "0x08 absolute pressure",
        param: {}
      },
      16: {
        name: "DIFFERENTIAL_PRESSURE",
        description: "0x10 differential pressure",
        param: {}
      },
      32: {
        name: "GPS",
        description: "0x20 GPS",
        param: {}
      },
      64: {
        name: "OPTICAL_FLOW",
        description: "0x40 optical flow",
        param: {}
      },
      128: {
        name: "VISION_POSITION",
        description: "0x80 computer vision position",
        param: {}
      },
      256: {
        name: "LASER_POSITION",
        description: "0x100 laser based position",
        param: {}
      },
      512: {
        name: "EXTERNAL_GROUND_TRUTH",
        description: "0x200 external ground truth (Vicon or Leica)",
        param: {}
      },
      1024: {
        name: "ANGULAR_RATE_CONTROL",
        description: "0x400 3D angular rate control",
        param: {}
      },
      2048: {
        name: "ATTITUDE_STABILIZATION",
        description: "0x800 attitude stabilization",
        param: {}
      },
      4096: {
        name: "YAW_POSITION",
        description: "0x1000 yaw position",
        param: {}
      },
      8192: {
        name: "Z_ALTITUDE_CONTROL",
        description: "0x2000 z/altitude control",
        param: {}
      },
      16384: {
        name: "XY_POSITION_CONTROL",
        description: "0x4000 x/y position control",
        param: {}
      },
      32768: {
        name: "MOTOR_OUTPUTS",
        description: "0x8000 motor outputs / control",
        param: {}
      },
      65536: {
        name: "RC_RECEIVER",
        description: "0x10000 rc receiver",
        param: {}
      },
      131072: {
        name: "3D_GYRO2",
        description: "0x20000 2nd 3D gyro",
        param: {}
      },
      262144: {
        name: "3D_ACCEL2",
        description: "0x40000 2nd 3D accelerometer",
        param: {}
      },
      524288: {
        name: "3D_MAG2",
        description: "0x80000 2nd 3D magnetometer",
        param: {}
      },
      1048576: {
        name: "MAV_SYS_STATUS_GEOFENCE",
        description: "0x100000 geofence",
        param: {}
      },
      2097152: {
        name: "MAV_SYS_STATUS_AHRS",
        description: "0x200000 AHRS subsystem health",
        param: {}
      },
      4194304: {
        name: "MAV_SYS_STATUS_TERRAIN",
        description: "0x400000 Terrain subsystem health",
        param: {}
      },
      8388608: {
        name: "MAV_SYS_STATUS_REVERSE_MOTOR",
        description: "0x800000 Motors are reversed",
        param: {}
      },
      16777216: {
        name: "MAV_SYS_STATUS_LOGGING",
        description: "0x1000000 Logging",
        param: {}
      },
      33554432: {
        name: "BATTERY",
        description: "0x2000000 Battery",
        param: {}
      },
      67108864: {
        name: "PROXIMITY",
        description: "0x4000000 Proximity",
        param: {}
      },
      134217728: {
        name: "SATCOM",
        description: "0x8000000 Satellite Communication ",
        param: {}
      }
    },
    MAV_FRAME: {
      0: {
        name: "GLOBAL",
        description: "Global coordinate frame, WGS84 coordinate system. First value / x: latitude, second value / y: longitude, third value / z: positive altitude over mean sea level (MSL).",
        param: {}
      },
      1: {
        name: "LOCAL_NED",
        description: "Local coordinate frame, Z-down (x: north, y: east, z: down).",
        param: {}
      },
      2: {
        name: "MISSION",
        description: "NOT a coordinate frame, indicates a mission command.",
        param: {}
      },
      3: {
        name: "GLOBAL_RELATIVE_ALT",
        description: "Global coordinate frame, WGS84 coordinate system, relative altitude over ground with respect to the home position. First value / x: latitude, second value / y: longitude, third value / z: positive altitude with 0 being at the altitude of the home location.",
        param: {}
      },
      4: {
        name: "LOCAL_ENU",
        description: "Local coordinate frame, Z-up (x: east, y: north, z: up).",
        param: {}
      },
      5: {
        name: "GLOBAL_INT",
        description: "Global coordinate frame, WGS84 coordinate system. First value / x: latitude in degrees*1.0e-7, second value / y: longitude in degrees*1.0e-7, third value / z: positive altitude over mean sea level (MSL).",
        param: {}
      },
      6: {
        name: "GLOBAL_RELATIVE_ALT_INT",
        description: "Global coordinate frame, WGS84 coordinate system, relative altitude over ground with respect to the home position. First value / x: latitude in degrees*10e-7, second value / y: longitude in degrees*10e-7, third value / z: positive altitude with 0 being at the altitude of the home location.",
        param: {}
      },
      7: {
        name: "LOCAL_OFFSET_NED",
        description: "Offset to the current local frame. Anything expressed in this frame should be added to the current local frame position.",
        param: {}
      },
      8: {
        name: "BODY_NED",
        description: "Setpoint in body NED frame. This makes sense if all position control is externalized - e.g. useful to command 2 m/s^2 acceleration to the right.",
        param: {}
      },
      9: {
        name: "BODY_OFFSET_NED",
        description: "Offset in body NED frame. This makes sense if adding setpoints to the current flight path, to avoid an obstacle - e.g. useful to command 2 m/s^2 acceleration to the east.",
        param: {}
      },
      10: {
        name: "GLOBAL_TERRAIN_ALT",
        description: "Global coordinate frame with above terrain level altitude. WGS84 coordinate system, relative altitude over terrain with respect to the waypoint coordinate. First value / x: latitude in degrees, second value / y: longitude in degrees, third value / z: positive altitude in meters with 0 being at ground level in terrain model.",
        param: {}
      },
      11: {
        name: "GLOBAL_TERRAIN_ALT_INT",
        description: "Global coordinate frame with above terrain level altitude. WGS84 coordinate system, relative altitude over terrain with respect to the waypoint coordinate. First value / x: latitude in degrees*10e-7, second value / y: longitude in degrees*10e-7, third value / z: positive altitude in meters with 0 being at ground level in terrain model.",
        param: {}
      },
      12: {
        name: "BODY_FRD",
        description: "Body fixed frame of reference, Z-down (x: forward, y: right, z: down).",
        param: {}
      },
      13: {
        name: "BODY_FLU",
        description: "Body fixed frame of reference, Z-up (x: forward, y: left, z: up).",
        param: {}
      },
      14: {
        name: "MOCAP_NED",
        description: "Odometry local coordinate frame of data given by a motion capture system, Z-down (x: north, y: east, z: down).",
        param: {}
      },
      15: {
        name: "MOCAP_ENU",
        description: "Odometry local coordinate frame of data given by a motion capture system, Z-up (x: east, y: north, z: up).",
        param: {}
      },
      16: {
        name: "VISION_NED",
        description: "Odometry local coordinate frame of data given by a vision estimation system, Z-down (x: north, y: east, z: down).",
        param: {}
      },
      17: {
        name: "VISION_ENU",
        description: "Odometry local coordinate frame of data given by a vision estimation system, Z-up (x: east, y: north, z: up).",
        param: {}
      },
      18: {
        name: "ESTIM_NED",
        description: "Odometry local coordinate frame of data given by an estimator running onboard the vehicle, Z-down (x: north, y: east, z: down).",
        param: {}
      },
      19: {
        name: "ESTIM_ENU",
        description: "Odometry local coordinate frame of data given by an estimator running onboard the vehicle, Z-up (x: east, y: noth, z: up).",
        param: {}
      }
    },
    MAVLINK_DATA_STREAM_TYPE: {
      1: {
        name: "MAVLINK_DATA_STREAM_IMG_JPEG",
        description: "",
        param: {}
      },
      2: {
        name: "MAVLINK_DATA_STREAM_IMG_BMP",
        description: "",
        param: {}
      },
      3: {
        name: "MAVLINK_DATA_STREAM_IMG_RAW8U",
        description: "",
        param: {}
      },
      4: {
        name: "MAVLINK_DATA_STREAM_IMG_RAW32U",
        description: "",
        param: {}
      },
      5: {
        name: "MAVLINK_DATA_STREAM_IMG_PGM",
        description: "",
        param: {}
      },
      6: {
        name: "MAVLINK_DATA_STREAM_IMG_PNG",
        description: "",
        param: {}
      }
    },
    FENCE_ACTION: {
      0: {
        name: "NONE",
        description: "Disable fenced mode",
        param: {}
      },
      1: {
        name: "GUIDED",
        description: "Switched to guided mode to return point (fence point 0)",
        param: {}
      },
      2: {
        name: "REPORT",
        description: "Report fence breach, but don't take action",
        param: {}
      },
      3: {
        name: "GUIDED_THR_PASS",
        description: "Switched to guided mode to return point (fence point 0) with manual throttle control",
        param: {}
      },
      4: {
        name: "RTL",
        description: "Switch to RTL (return to launch) mode and head for the return point.",
        param: {}
      }
    },
    FENCE_BREACH: {
      0: {
        name: "NONE",
        description: "No last fence breach",
        param: {}
      },
      1: {
        name: "MINALT",
        description: "Breached minimum altitude",
        param: {}
      },
      2: {
        name: "MAXALT",
        description: "Breached maximum altitude",
        param: {}
      },
      3: {
        name: "BOUNDARY",
        description: "Breached fence boundary",
        param: {}
      }
    },
    MAV_MOUNT_MODE: {
      0: {
        name: "RETRACT",
        description: "Load and keep safe position (Roll,Pitch,Yaw) from permant memory and stop stabilization",
        param: {}
      },
      1: {
        name: "NEUTRAL",
        description: "Load and keep neutral position (Roll,Pitch,Yaw) from permanent memory.",
        param: {}
      },
      2: {
        name: "MAVLINK_TARGETING",
        description: "Load neutral position and start MAVLink Roll,Pitch,Yaw control with stabilization",
        param: {}
      },
      3: {
        name: "RC_TARGETING",
        description: "Load neutral position and start RC Roll,Pitch,Yaw control with stabilization",
        param: {}
      },
      4: {
        name: "GPS_POINT",
        description: "Load neutral position and start to point to Lat,Lon,Alt",
        param: {}
      }
    },
    UAVCAN_NODE_HEALTH: {
      0: {
        name: "OK",
        description: "The node is functioning properly.",
        param: {}
      },
      1: {
        name: "WARNING",
        description: "A critical parameter went out of range or the node has encountered a minor failure.",
        param: {}
      },
      2: {
        name: "ERROR",
        description: "The node has encountered a major failure.",
        param: {}
      },
      3: {
        name: "CRITICAL",
        description: "The node has suffered a fatal malfunction.",
        param: {}
      }
    },
    UAVCAN_NODE_MODE: {
      0: {
        name: "OPERATIONAL",
        description: "The node is performing its primary functions.",
        param: {}
      },
      1: {
        name: "INITIALIZATION",
        description: "The node is initializing; this mode is entered immediately after startup.",
        param: {}
      },
      2: {
        name: "MAINTENANCE",
        description: "The node is under maintenance.",
        param: {}
      },
      3: {
        name: "SOFTWARE_UPDATE",
        description: "The node is in the process of updating its software.",
        param: {}
      },
      7: {
        name: "OFFLINE",
        description: "The node is no longer available online.",
        param: {}
      }
    },
    MAV_DATA_STREAM: {
      0: {
        name: "ALL",
        description: "Enable all data streams",
        param: {}
      },
      1: {
        name: "RAW_SENSORS",
        description: "Enable IMU_RAW, GPS_RAW, GPS_STATUS packets.",
        param: {}
      },
      2: {
        name: "EXTENDED_STATUS",
        description: "Enable GPS_STATUS, CONTROL_STATUS, AUX_STATUS",
        param: {}
      },
      3: {
        name: "RC_CHANNELS",
        description: "Enable RC_CHANNELS_SCALED, RC_CHANNELS_RAW, SERVO_OUTPUT_RAW",
        param: {}
      },
      4: {
        name: "RAW_CONTROLLER",
        description: "Enable ATTITUDE_CONTROLLER_OUTPUT, POSITION_CONTROLLER_OUTPUT, NAV_CONTROLLER_OUTPUT.",
        param: {}
      },
      6: {
        name: "POSITION",
        description: "Enable LOCAL_POSITION, GLOBAL_POSITION/GLOBAL_POSITION_INT messages.",
        param: {}
      },
      10: {
        name: "EXTRA1",
        description: "Dependent on the autopilot",
        param: {}
      },
      11: {
        name: "EXTRA2",
        description: "Dependent on the autopilot",
        param: {}
      },
      12: {
        name: "EXTRA3",
        description: "Dependent on the autopilot",
        param: {}
      }
    },
    MAV_ROI: {
      0: {
        name: "NONE",
        description: "No region of interest.",
        param: {}
      },
      1: {
        name: "WPNEXT",
        description: "Point toward next waypoint, with optional pitch/roll/yaw offset.",
        param: {}
      },
      2: {
        name: "WPINDEX",
        description: "Point toward given waypoint.",
        param: {}
      },
      3: {
        name: "LOCATION",
        description: "Point toward fixed location.",
        param: {}
      },
      4: {
        name: "TARGET",
        description: "Point toward of given id.",
        param: {}
      }
    },
    MAV_CMD_ACK: {
      1: {
        name: "OK",
        description: "Command / mission item is ok.",
        param: {}
      },
      2: {
        name: "ERR_FAIL",
        description: "Generic error message if none of the other reasons fails or if no detailed error reporting is implemented.",
        param: {}
      },
      3: {
        name: "ERR_ACCESS_DENIED",
        description: "The system is refusing to accept this command from this source / communication partner.",
        param: {}
      },
      4: {
        name: "ERR_NOT_SUPPORTED",
        description: "Command or mission item is not supported, other commands would be accepted.",
        param: {}
      },
      5: {
        name: "ERR_COORDINATE_FRAME_NOT_SUPPORTED",
        description: "The coordinate frame of this command / mission item is not supported.",
        param: {}
      },
      6: {
        name: "ERR_COORDINATES_OUT_OF_RANGE",
        description: "The coordinate frame of this command is ok, but he coordinate values exceed the safety limits of this system. This is a generic error, please use the more specific error messages below if possible.",
        param: {}
      },
      7: {
        name: "ERR_X_LAT_OUT_OF_RANGE",
        description: "The X or latitude value is out of range.",
        param: {}
      },
      8: {
        name: "ERR_Y_LON_OUT_OF_RANGE",
        description: "The Y or longitude value is out of range.",
        param: {}
      },
      9: {
        name: "ERR_Z_ALT_OUT_OF_RANGE",
        description: "The Z or altitude value is out of range.",
        param: {}
      }
    },
    MAV_PARAM_TYPE: {
      1: {
        name: "UINT8",
        description: "8-bit unsigned integer",
        param: {}
      },
      2: {
        name: "INT8",
        description: "8-bit signed integer",
        param: {}
      },
      3: {
        name: "UINT16",
        description: "16-bit unsigned integer",
        param: {}
      },
      4: {
        name: "INT16",
        description: "16-bit signed integer",
        param: {}
      },
      5: {
        name: "UINT32",
        description: "32-bit unsigned integer",
        param: {}
      },
      6: {
        name: "INT32",
        description: "32-bit signed integer",
        param: {}
      },
      7: {
        name: "UINT64",
        description: "64-bit unsigned integer",
        param: {}
      },
      8: {
        name: "INT64",
        description: "64-bit signed integer",
        param: {}
      },
      9: {
        name: "REAL32",
        description: "32-bit floating-point",
        param: {}
      },
      10: {
        name: "REAL64",
        description: "64-bit floating-point",
        param: {}
      }
    },
    MAV_RESULT: {
      0: {
        name: "ACCEPTED",
        description: "Command ACCEPTED and EXECUTED",
        param: {}
      },
      1: {
        name: "TEMPORARILY_REJECTED",
        description: "Command TEMPORARY REJECTED/DENIED",
        param: {}
      },
      2: {
        name: "DENIED",
        description: "Command PERMANENTLY DENIED",
        param: {}
      },
      3: {
        name: "UNSUPPORTED",
        description: "Command UNKNOWN/UNSUPPORTED",
        param: {}
      },
      4: {
        name: "FAILED",
        description: "Command executed, but failed",
        param: {}
      }
    },
    MAV_MISSION_RESULT: {
      0: {
        name: "MAV_MISSION_ACCEPTED",
        description: "mission accepted OK",
        param: {}
      },
      1: {
        name: "MAV_MISSION_ERROR",
        description: "generic error / not accepting mission commands at all right now",
        param: {}
      },
      2: {
        name: "MAV_MISSION_UNSUPPORTED_FRAME",
        description: "coordinate frame is not supported",
        param: {}
      },
      3: {
        name: "MAV_MISSION_UNSUPPORTED",
        description: "command is not supported",
        param: {}
      },
      4: {
        name: "MAV_MISSION_NO_SPACE",
        description: "mission item exceeds storage space",
        param: {}
      },
      5: {
        name: "MAV_MISSION_INVALID",
        description: "one of the parameters has an invalid value",
        param: {}
      },
      6: {
        name: "MAV_MISSION_INVALID_PARAM1",
        description: "param1 has an invalid value",
        param: {}
      },
      7: {
        name: "MAV_MISSION_INVALID_PARAM2",
        description: "param2 has an invalid value",
        param: {}
      },
      8: {
        name: "MAV_MISSION_INVALID_PARAM3",
        description: "param3 has an invalid value",
        param: {}
      },
      9: {
        name: "MAV_MISSION_INVALID_PARAM4",
        description: "param4 has an invalid value",
        param: {}
      },
      10: {
        name: "MAV_MISSION_INVALID_PARAM5_X",
        description: "x/param5 has an invalid value",
        param: {}
      },
      11: {
        name: "MAV_MISSION_INVALID_PARAM6_Y",
        description: "y/param6 has an invalid value",
        param: {}
      },
      12: {
        name: "MAV_MISSION_INVALID_PARAM7",
        description: "param7 has an invalid value",
        param: {}
      },
      13: {
        name: "MAV_MISSION_INVALID_SEQUENCE",
        description: "received waypoint out of sequence",
        param: {}
      },
      14: {
        name: "MAV_MISSION_DENIED",
        description: "not accepting any mission commands from this communication partner",
        param: {}
      }
    },
    MAV_SEVERITY: {
      0: {
        name: "EMERGENCY",
        description: "System is unusable. This is a \panic\ condition.",
        param: {}
      },
      1: {
        name: "ALERT",
        description: "Action should be taken immediately. Indicates error in non-critical systems.",
        param: {}
      },
      2: {
        name: "CRITICAL",
        description: "Action must be taken immediately. Indicates failure in a primary system.",
        param: {}
      },
      3: {
        name: "ERROR",
        description: "Indicates an error in secondary/redundant systems.",
        param: {}
      },
      4: {
        name: "WARNING",
        description: "Indicates about a possible future error if this is not resolved within a given timeframe. Example would be a low battery warning.",
        param: {}
      },
      5: {
        name: "NOTICE",
        description: "An unusual event has occurred, though not an error condition. This should be investigated for the root cause.",
        param: {}
      },
      6: {
        name: "INFO",
        description: "Normal operational messages. Useful for logging. No action is required for these messages.",
        param: {}
      },
      7: {
        name: "DEBUG",
        description: "Useful non-operational messages that can assist in debugging. These should not occur during normal operation.",
        param: {}
      }
    },
    MAV_POWER_STATUS: {
      1: {
        name: "BRICK_VALID",
        description: "main brick power supply valid",
        param: {}
      },
      2: {
        name: "SERVO_VALID",
        description: "main servo power supply valid for FMU",
        param: {}
      },
      4: {
        name: "USB_CONNECTED",
        description: "USB power is connected",
        param: {}
      },
      8: {
        name: "PERIPH_OVERCURRENT",
        description: "peripheral supply is in over-current state",
        param: {}
      },
      16: {
        name: "PERIPH_HIPOWER_OVERCURRENT",
        description: "hi-power peripheral supply is in over-current state",
        param: {}
      },
      32: {
        name: "CHANGED",
        description: "Power status has changed since boot",
        param: {}
      }
    },
    SERIAL_CONTROL_DEV: {
      0: {
        name: "TELEM1",
        description: "First telemetry port",
        param: {}
      },
      1: {
        name: "TELEM2",
        description: "Second telemetry port",
        param: {}
      },
      2: {
        name: "GPS1",
        description: "First GPS port",
        param: {}
      },
      3: {
        name: "GPS2",
        description: "Second GPS port",
        param: {}
      },
      10: {
        name: "SHELL",
        description: "system shell",
        param: {}
      }
    },
    SERIAL_CONTROL_FLAG: {
      1: {
        name: "REPLY",
        description: "Set if this is a reply",
        param: {}
      },
      2: {
        name: "RESPOND",
        description: "Set if the sender wants the receiver to send a response as another SERIAL_CONTROL message",
        param: {}
      },
      4: {
        name: "EXCLUSIVE",
        description: "Set if access to the serial port should be removed from whatever driver is currently using it, giving exclusive access to the SERIAL_CONTROL protocol. The port can be handed back by sending a request without this flag set",
        param: {}
      },
      8: {
        name: "BLOCKING",
        description: "Block on writes to the serial port",
        param: {}
      },
      16: {
        name: "MULTI",
        description: "Send multiple replies until port is drained",
        param: {}
      }
    },
    MAV_DISTANCE_SENSOR: {
      0: {
        name: "LASER",
        description: "Laser rangefinder, e.g. LightWare SF02/F or PulsedLight units",
        param: {}
      },
      1: {
        name: "ULTRASOUND",
        description: "Ultrasound rangefinder, e.g. MaxBotix units",
        param: {}
      },
      2: {
        name: "INFRARED",
        description: "Infrared rangefinder, e.g. Sharp units",
        param: {}
      },
      3: {
        name: "RADAR",
        description: "Radar type, e.g. uLanding units",
        param: {}
      },
      4: {
        name: "UNKNOWN",
        description: "Broken or unknown type, e.g. analog units",
        param: {}
      }
    },
    MAV_SENSOR_ORIENTATION: {
      0: {
        name: "MAV_SENSOR_ROTATION_NONE",
        description: "Roll: 0, Pitch: 0, Yaw: 0",
        param: {}
      },
      1: {
        name: "MAV_SENSOR_ROTATION_YAW_45",
        description: "Roll: 0, Pitch: 0, Yaw: 45",
        param: {}
      },
      2: {
        name: "MAV_SENSOR_ROTATION_YAW_90",
        description: "Roll: 0, Pitch: 0, Yaw: 90",
        param: {}
      },
      3: {
        name: "MAV_SENSOR_ROTATION_YAW_135",
        description: "Roll: 0, Pitch: 0, Yaw: 135",
        param: {}
      },
      4: {
        name: "MAV_SENSOR_ROTATION_YAW_180",
        description: "Roll: 0, Pitch: 0, Yaw: 180",
        param: {}
      },
      5: {
        name: "MAV_SENSOR_ROTATION_YAW_225",
        description: "Roll: 0, Pitch: 0, Yaw: 225",
        param: {}
      },
      6: {
        name: "MAV_SENSOR_ROTATION_YAW_270",
        description: "Roll: 0, Pitch: 0, Yaw: 270",
        param: {}
      },
      7: {
        name: "MAV_SENSOR_ROTATION_YAW_315",
        description: "Roll: 0, Pitch: 0, Yaw: 315",
        param: {}
      },
      8: {
        name: "MAV_SENSOR_ROTATION_ROLL_180",
        description: "Roll: 180, Pitch: 0, Yaw: 0",
        param: {}
      },
      9: {
        name: "MAV_SENSOR_ROTATION_ROLL_180_YAW_45",
        description: "Roll: 180, Pitch: 0, Yaw: 45",
        param: {}
      },
      10: {
        name: "MAV_SENSOR_ROTATION_ROLL_180_YAW_90",
        description: "Roll: 180, Pitch: 0, Yaw: 90",
        param: {}
      },
      11: {
        name: "MAV_SENSOR_ROTATION_ROLL_180_YAW_135",
        description: "Roll: 180, Pitch: 0, Yaw: 135",
        param: {}
      },
      12: {
        name: "MAV_SENSOR_ROTATION_PITCH_180",
        description: "Roll: 0, Pitch: 180, Yaw: 0",
        param: {}
      },
      13: {
        name: "MAV_SENSOR_ROTATION_ROLL_180_YAW_225",
        description: "Roll: 180, Pitch: 0, Yaw: 225",
        param: {}
      },
      14: {
        name: "MAV_SENSOR_ROTATION_ROLL_180_YAW_270",
        description: "Roll: 180, Pitch: 0, Yaw: 270",
        param: {}
      },
      15: {
        name: "MAV_SENSOR_ROTATION_ROLL_180_YAW_315",
        description: "Roll: 180, Pitch: 0, Yaw: 315",
        param: {}
      },
      16: {
        name: "MAV_SENSOR_ROTATION_ROLL_90",
        description: "Roll: 90, Pitch: 0, Yaw: 0",
        param: {}
      },
      17: {
        name: "MAV_SENSOR_ROTATION_ROLL_90_YAW_45",
        description: "Roll: 90, Pitch: 0, Yaw: 45",
        param: {}
      },
      18: {
        name: "MAV_SENSOR_ROTATION_ROLL_90_YAW_90",
        description: "Roll: 90, Pitch: 0, Yaw: 90",
        param: {}
      },
      19: {
        name: "MAV_SENSOR_ROTATION_ROLL_90_YAW_135",
        description: "Roll: 90, Pitch: 0, Yaw: 135",
        param: {}
      },
      20: {
        name: "MAV_SENSOR_ROTATION_ROLL_270",
        description: "Roll: 270, Pitch: 0, Yaw: 0",
        param: {}
      },
      21: {
        name: "MAV_SENSOR_ROTATION_ROLL_270_YAW_45",
        description: "Roll: 270, Pitch: 0, Yaw: 45",
        param: {}
      },
      22: {
        name: "MAV_SENSOR_ROTATION_ROLL_270_YAW_90",
        description: "Roll: 270, Pitch: 0, Yaw: 90",
        param: {}
      },
      23: {
        name: "MAV_SENSOR_ROTATION_ROLL_270_YAW_135",
        description: "Roll: 270, Pitch: 0, Yaw: 135",
        param: {}
      },
      24: {
        name: "MAV_SENSOR_ROTATION_PITCH_90",
        description: "Roll: 0, Pitch: 90, Yaw: 0",
        param: {}
      },
      25: {
        name: "MAV_SENSOR_ROTATION_PITCH_270",
        description: "Roll: 0, Pitch: 270, Yaw: 0",
        param: {}
      },
      26: {
        name: "MAV_SENSOR_ROTATION_PITCH_180_YAW_90",
        description: "Roll: 0, Pitch: 180, Yaw: 90",
        param: {}
      },
      27: {
        name: "MAV_SENSOR_ROTATION_PITCH_180_YAW_270",
        description: "Roll: 0, Pitch: 180, Yaw: 270",
        param: {}
      },
      28: {
        name: "MAV_SENSOR_ROTATION_ROLL_90_PITCH_90",
        description: "Roll: 90, Pitch: 90, Yaw: 0",
        param: {}
      },
      29: {
        name: "MAV_SENSOR_ROTATION_ROLL_180_PITCH_90",
        description: "Roll: 180, Pitch: 90, Yaw: 0",
        param: {}
      },
      30: {
        name: "MAV_SENSOR_ROTATION_ROLL_270_PITCH_90",
        description: "Roll: 270, Pitch: 90, Yaw: 0",
        param: {}
      },
      31: {
        name: "MAV_SENSOR_ROTATION_ROLL_90_PITCH_180",
        description: "Roll: 90, Pitch: 180, Yaw: 0",
        param: {}
      },
      32: {
        name: "MAV_SENSOR_ROTATION_ROLL_270_PITCH_180",
        description: "Roll: 270, Pitch: 180, Yaw: 0",
        param: {}
      },
      33: {
        name: "MAV_SENSOR_ROTATION_ROLL_90_PITCH_270",
        description: "Roll: 90, Pitch: 270, Yaw: 0",
        param: {}
      },
      34: {
        name: "MAV_SENSOR_ROTATION_ROLL_180_PITCH_270",
        description: "Roll: 180, Pitch: 270, Yaw: 0",
        param: {}
      },
      35: {
        name: "MAV_SENSOR_ROTATION_ROLL_270_PITCH_270",
        description: "Roll: 270, Pitch: 270, Yaw: 0",
        param: {}
      },
      36: {
        name: "MAV_SENSOR_ROTATION_ROLL_90_PITCH_180_YAW_90",
        description: "Roll: 90, Pitch: 180, Yaw: 90",
        param: {}
      },
      37: {
        name: "MAV_SENSOR_ROTATION_ROLL_90_YAW_270",
        description: "Roll: 90, Pitch: 0, Yaw: 270",
        param: {}
      },
      38: {
        name: "MAV_SENSOR_ROTATION_ROLL_90_PITCH_68_YAW_293",
        description: "Roll: 90, Pitch: 68, Yaw: 293",
        param: {}
      },
      39: {
        name: "MAV_SENSOR_ROTATION_PITCH_315",
        description: "Pitch: 315",
        param: {}
      },
      40: {
        name: "MAV_SENSOR_ROTATION_ROLL_90_PITCH_315",
        description: "Roll: 90, Pitch: 315",
        param: {}
      },
      100: {
        name: "MAV_SENSOR_ROTATION_CUSTOM",
        description: "Custom orientation",
        param: {}
      }
    },
    MAV_PROTOCOL_CAPABILITY: {
      1: {
        name: "MISSION_FLOAT",
        description: "Autopilot supports MISSION float message type.",
        param: {}
      },
      2: {
        name: "PARAM_FLOAT",
        description: "Autopilot supports the new param float message type.",
        param: {}
      },
      4: {
        name: "MISSION_INT",
        description: "Autopilot supports MISSION_INT scaled integer message type.",
        param: {}
      },
      8: {
        name: "COMMAND_INT",
        description: "Autopilot supports COMMAND_INT scaled integer message type.",
        param: {}
      },
      16: {
        name: "PARAM_UNION",
        description: "Autopilot supports the new param union message type.",
        param: {}
      },
      32: {
        name: "FTP",
        description: "Autopilot supports the new FILE_TRANSFER_PROTOCOL message type.",
        param: {}
      },
      64: {
        name: "SET_ATTITUDE_TARGET",
        description: "Autopilot supports commanding attitude offboard.",
        param: {}
      },
      128: {
        name: "SET_POSITION_TARGET_LOCAL_NED",
        description: "Autopilot supports commanding position and velocity targets in local NED frame.",
        param: {}
      },
      256: {
        name: "SET_POSITION_TARGET_GLOBAL_INT",
        description: "Autopilot supports commanding position and velocity targets in global scaled integers.",
        param: {}
      },
      512: {
        name: "TERRAIN",
        description: "Autopilot supports terrain protocol / data handling.",
        param: {}
      },
      1024: {
        name: "SET_ACTUATOR_TARGET",
        description: "Autopilot supports direct actuator control.",
        param: {}
      },
      2048: {
        name: "FLIGHT_TERMINATION",
        description: "Autopilot supports the flight termination command.",
        param: {}
      },
      4096: {
        name: "COMPASS_CALIBRATION",
        description: "Autopilot supports onboard compass calibration.",
        param: {}
      },
      8192: {
        name: "MAVLINK2",
        description: "Autopilot supports MAVLink version 2.",
        param: {}
      },
      16384: {
        name: "MISSION_FENCE",
        description: "Autopilot supports mission fence protocol.",
        param: {}
      },
      32768: {
        name: "MISSION_RALLY",
        description: "Autopilot supports mission rally point protocol.",
        param: {}
      },
      65536: {
        name: "FLIGHT_INFORMATION",
        description: "Autopilot supports the flight information protocol.",
        param: {}
      }
    },
    MAV_MISSION_TYPE: {
      0: {
        name: "MISSION",
        description: "Items are mission commands for main mission.",
        param: {}
      },
      1: {
        name: "FENCE",
        description: "Specifies GeoFence area(s). Items are MAV_CMD_FENCE_ GeoFence items.",
        param: {}
      },
      2: {
        name: "RALLY",
        description: "Specifies the rally points for the vehicle. Rally points are alternative RTL points. Items are MAV_CMD_RALLY_POINT rally point items.",
        param: {}
      },
      255: {
        name: "ALL",
        description: "Only used in MISSION_CLEAR_ALL to clear all mission types.",
        param: {}
      }
    },
    MAV_ESTIMATOR_TYPE: {
      1: {
        name: "NAIVE",
        description: "This is a naive estimator without any real covariance feedback.",
        param: {}
      },
      2: {
        name: "VISION",
        description: "Computer vision based estimate. Might be up to scale.",
        param: {}
      },
      3: {
        name: "VIO",
        description: "Visual-inertial estimate.",
        param: {}
      },
      4: {
        name: "GPS",
        description: "Plain GPS estimate.",
        param: {}
      },
      5: {
        name: "GPS_INS",
        description: "Estimator integrating GPS and inertial sensing.",
        param: {}
      }
    },
    MAV_BATTERY_TYPE: {
      0: {
        name: "UNKNOWN",
        description: "Not specified.",
        param: {}
      },
      1: {
        name: "LIPO",
        description: "Lithium polymer battery",
        param: {}
      },
      2: {
        name: "LIFE",
        description: "Lithium-iron-phosphate battery",
        param: {}
      },
      3: {
        name: "LION",
        description: "Lithium-ION battery",
        param: {}
      },
      4: {
        name: "NIMH",
        description: "Nickel metal hydride battery",
        param: {}
      }
    },
    MAV_BATTERY_FUNCTION: {
      0: {
        name: "UNKNOWN",
        description: "Battery function is unknown",
        param: {}
      },
      1: {
        name: "ALL",
        description: "Battery supports all flight systems",
        param: {}
      },
      2: {
        name: "PROPULSION",
        description: "Battery for the propulsion system",
        param: {}
      },
      3: {
        name: "AVIONICS",
        description: "Avionics battery",
        param: {}
      },
      4: {
        name: "MAV_BATTERY_TYPE_PAYLOAD",
        description: "Payload battery",
        param: {}
      }
    },
    MAV_BATTERY_CHARGE_STATE: {
      0: {
        name: "UNDEFINED",
        description: "Low battery state is not provided",
        param: {}
      },
      1: {
        name: "OK",
        description: "Battery is not in low state. Normal operation.",
        param: {}
      },
      2: {
        name: "LOW",
        description: "Battery state is low, warn and monitor close.",
        param: {}
      },
      3: {
        name: "CRITICAL",
        description: "Battery state is critical, return or abort immediately.",
        param: {}
      },
      4: {
        name: "EMERGENCY",
        description: "Battery state is too low for ordinary abort sequence. Perform fastest possible emergency stop to prevent damage.",
        param: {}
      },
      5: {
        name: "FAILED",
        description: "Battery failed, damage unavoidable.",
        param: {}
      },
      6: {
        name: "UNHEALTHY",
        description: "Battery is diagnosed to be defective or an error occurred, usage is discouraged / prohibited.",
        param: {}
      }
    },
    MAV_VTOL_STATE: {
      0: {
        name: "UNDEFINED",
        description: "MAV is not configured as VTOL",
        param: {}
      },
      1: {
        name: "TRANSITION_TO_FW",
        description: "VTOL is in transition from multicopter to fixed-wing",
        param: {}
      },
      2: {
        name: "TRANSITION_TO_MC",
        description: "VTOL is in transition from fixed-wing to multicopter",
        param: {}
      },
      3: {
        name: "MC",
        description: "VTOL is in multicopter state",
        param: {}
      },
      4: {
        name: "FW",
        description: "VTOL is in fixed-wing state",
        param: {}
      }
    },
    MAV_LANDED_STATE: {
      0: {
        name: "UNDEFINED",
        description: "MAV landed state is unknown",
        param: {}
      },
      1: {
        name: "ON_GROUND",
        description: "MAV is landed (on ground)",
        param: {}
      },
      2: {
        name: "IN_AIR",
        description: "MAV is in air",
        param: {}
      },
      3: {
        name: "TAKEOFF",
        description: "MAV currently taking off",
        param: {}
      },
      4: {
        name: "LANDING",
        description: "MAV currently landing",
        param: {}
      }
    },
    ADSB_ALTITUDE_TYPE: {
      0: {
        name: "PRESSURE_QNH",
        description: "Altitude reported from a Baro source using QNH reference",
        param: {}
      },
      1: {
        name: "GEOMETRIC",
        description: "Altitude reported from a GNSS source",
        param: {}
      }
    },
    ADSB_EMITTER_TYPE: {
      0: {
        name: "NO_INFO",
        description: "",
        param: {}
      },
      1: {
        name: "LIGHT",
        description: "",
        param: {}
      },
      2: {
        name: "SMALL",
        description: "",
        param: {}
      },
      3: {
        name: "LARGE",
        description: "",
        param: {}
      },
      4: {
        name: "HIGH_VORTEX_LARGE",
        description: "",
        param: {}
      },
      5: {
        name: "HEAVY",
        description: "",
        param: {}
      },
      6: {
        name: "HIGHLY_MANUV",
        description: "",
        param: {}
      },
      7: {
        name: "ROTOCRAFT",
        description: "",
        param: {}
      },
      8: {
        name: "UNASSIGNED",
        description: "",
        param: {}
      },
      9: {
        name: "GLIDER",
        description: "",
        param: {}
      },
      10: {
        name: "LIGHTER_AIR",
        description: "",
        param: {}
      },
      11: {
        name: "PARACHUTE",
        description: "",
        param: {}
      },
      12: {
        name: "ULTRA_LIGHT",
        description: "",
        param: {}
      },
      13: {
        name: "UNASSIGNED2",
        description: "",
        param: {}
      },
      14: {
        name: "UAV",
        description: "",
        param: {}
      },
      15: {
        name: "SPACE",
        description: "",
        param: {}
      },
      16: {
        name: "UNASSGINED3",
        description: "",
        param: {}
      },
      17: {
        name: "EMERGENCY_SURFACE",
        description: "",
        param: {}
      },
      18: {
        name: "SERVICE_SURFACE",
        description: "",
        param: {}
      },
      19: {
        name: "POINT_OBSTACLE",
        description: "",
        param: {}
      }
    },
    ADSB_FLAGS: {
      1: {
        name: "VALID_COORDS",
        description: "",
        param: {}
      },
      2: {
        name: "VALID_ALTITUDE",
        description: "",
        param: {}
      },
      4: {
        name: "VALID_HEADING",
        description: "",
        param: {}
      },
      8: {
        name: "VALID_VELOCITY",
        description: "",
        param: {}
      },
      16: {
        name: "VALID_CALLSIGN",
        description: "",
        param: {}
      },
      32: {
        name: "VALID_SQUAWK",
        description: "",
        param: {}
      },
      64: {
        name: "SIMULATED",
        description: "",
        param: {}
      }
    },
    MAV_DO_REPOSITION_FLAGS: {
      1: {
        name: "CHANGE_MODE",
        description: "The aircraft should immediately transition into guided. This should not be set for follow me applications",
        param: {}
      }
    },
    ESTIMATOR_STATUS_FLAGS: {
      1: {
        name: "ESTIMATOR_ATTITUDE",
        description: "True if the attitude estimate is good",
        param: {}
      },
      2: {
        name: "ESTIMATOR_VELOCITY_HORIZ",
        description: "True if the horizontal velocity estimate is good",
        param: {}
      },
      4: {
        name: "ESTIMATOR_VELOCITY_VERT",
        description: "True if the  vertical velocity estimate is good",
        param: {}
      },
      8: {
        name: "ESTIMATOR_POS_HORIZ_REL",
        description: "True if the horizontal position (relative) estimate is good",
        param: {}
      },
      16: {
        name: "ESTIMATOR_POS_HORIZ_ABS",
        description: "True if the horizontal position (absolute) estimate is good",
        param: {}
      },
      32: {
        name: "ESTIMATOR_POS_VERT_ABS",
        description: "True if the vertical position (absolute) estimate is good",
        param: {}
      },
      64: {
        name: "ESTIMATOR_POS_VERT_AGL",
        description: "True if the vertical position (above ground) estimate is good",
        param: {}
      },
      128: {
        name: "ESTIMATOR_CONST_POS_MODE",
        description: "True if the EKF is in a constant position mode and is not using external measurements (eg GPS or optical flow)",
        param: {}
      },
      256: {
        name: "ESTIMATOR_PRED_POS_HORIZ_REL",
        description: "True if the EKF has sufficient data to enter a mode that will provide a (relative) position estimate",
        param: {}
      },
      512: {
        name: "ESTIMATOR_PRED_POS_HORIZ_ABS",
        description: "True if the EKF has sufficient data to enter a mode that will provide a (absolute) position estimate",
        param: {}
      },
      1024: {
        name: "ESTIMATOR_GPS_GLITCH",
        description: "True if the EKF has detected a GPS glitch",
        param: {}
      },
      2048: {
        name: "ESTIMATOR_ACCEL_ERROR",
        description: "True if the EKF has detected bad accelerometer data",
        param: {}
      }
    },
    MOTOR_TEST_ORDER: {
      0: {
        name: "DEFAULT",
        description: "default autopilot motor test method",
        param: {}
      },
      1: {
        name: "SEQUENCE",
        description: "motor numbers are specified as their index in a predefined vehicle-specific sequence",
        param: {}
      },
      2: {
        name: "BOARD",
        description: "motor numbers are specified as the output as labeled on the board",
        param: {}
      }
    },
    MOTOR_TEST_THROTTLE_TYPE: {
      0: {
        name: "MOTOR_TEST_THROTTLE_PERCENT",
        description: "throttle as a percentage from 0 ~ 100",
        param: {}
      },
      1: {
        name: "MOTOR_TEST_THROTTLE_PWM",
        description: "throttle as an absolute PWM value (normally in range of 1000~2000)",
        param: {}
      },
      2: {
        name: "MOTOR_TEST_THROTTLE_PILOT",
        description: "throttle pass-through from pilot's transmitter",
        param: {}
      },
      3: {
        name: "MOTOR_TEST_COMPASS_CAL",
        description: "per-motor compass calibration test",
        param: {}
      }
    },
    GPS_INPUT_IGNORE_FLAGS: {
      1: {
        name: "GPS_INPUT_IGNORE_FLAG_ALT",
        description: "ignore altitude field",
        param: {}
      },
      2: {
        name: "GPS_INPUT_IGNORE_FLAG_HDOP",
        description: "ignore hdop field",
        param: {}
      },
      4: {
        name: "GPS_INPUT_IGNORE_FLAG_VDOP",
        description: "ignore vdop field",
        param: {}
      },
      8: {
        name: "GPS_INPUT_IGNORE_FLAG_VEL_HORIZ",
        description: "ignore horizontal velocity field (vn and ve)",
        param: {}
      },
      16: {
        name: "GPS_INPUT_IGNORE_FLAG_VEL_VERT",
        description: "ignore vertical velocity field (vd)",
        param: {}
      },
      32: {
        name: "GPS_INPUT_IGNORE_FLAG_SPEED_ACCURACY",
        description: "ignore speed accuracy field",
        param: {}
      },
      64: {
        name: "GPS_INPUT_IGNORE_FLAG_HORIZONTAL_ACCURACY",
        description: "ignore horizontal accuracy field",
        param: {}
      },
      128: {
        name: "GPS_INPUT_IGNORE_FLAG_VERTICAL_ACCURACY",
        description: "ignore vertical accuracy field",
        param: {}
      }
    },
    MAV_COLLISION_ACTION: {
      0: {
        name: "NONE",
        description: "Ignore any potential collisions",
        param: {}
      },
      1: {
        name: "REPORT",
        description: "Report potential collision",
        param: {}
      },
      2: {
        name: "ASCEND_OR_DESCEND",
        description: "Ascend or Descend to avoid threat",
        param: {}
      },
      3: {
        name: "MOVE_HORIZONTALLY",
        description: "Move horizontally to avoid threat",
        param: {}
      },
      4: {
        name: "MOVE_PERPENDICULAR",
        description: "Aircraft to move perpendicular to the collision's velocity vector",
        param: {}
      },
      5: {
        name: "RTL",
        description: "Aircraft to fly directly back to its launch point",
        param: {}
      },
      6: {
        name: "HOVER",
        description: "Aircraft to stop in place",
        param: {}
      }
    },
    MAV_COLLISION_THREAT_LEVEL: {
      0: {
        name: "NONE",
        description: "Not a threat",
        param: {}
      },
      1: {
        name: "LOW",
        description: "Craft is mildly concerned about this threat",
        param: {}
      },
      2: {
        name: "HIGH",
        description: "Craft is panicing, and may take actions to avoid threat",
        param: {}
      }
    },
    MAV_COLLISION_SRC: {
      0: {
        name: "ADSB",
        description: "ID field references ADSB_VEHICLE packets",
        param: {}
      },
      1: {
        name: "MAVLINK_GPS_GLOBAL_INT",
        description: "ID field references MAVLink SRC ID",
        param: {}
      }
    },
    GPS_FIX_TYPE: {
      0: {
        name: "NO_GPS",
        description: "No GPS connected",
        param: {}
      },
      1: {
        name: "NO_FIX",
        description: "No position information, GPS is connected",
        param: {}
      },
      2: {
        name: "2D_FIX",
        description: "2D position",
        param: {}
      },
      3: {
        name: "3D_FIX",
        description: "3D position",
        param: {}
      },
      4: {
        name: "DGPS",
        description: "DGPS/SBAS aided 3D position",
        param: {}
      },
      5: {
        name: "RTK_FLOAT",
        description: "RTK float, 3D position",
        param: {}
      },
      6: {
        name: "RTK_FIXED",
        description: "RTK Fixed, 3D position",
        param: {}
      },
      7: {
        name: "STATIC",
        description: "Static fixed, typically used for base stations",
        param: {}
      },
      8: {
        name: "PPP",
        description: "PPP, 3D position.",
        param: {}
      }
    },
    RTK_BASELINE_COORDINATE_SYSTEM: {
      0: {
        name: "ECEF",
        description: "Earth-centered, Earth-fixed",
        param: {}
      },
      1: {
        name: "NED",
        description: "North, East, Down",
        param: {}
      }
    },
    LANDING_TARGET_TYPE: {
      0: {
        name: "LIGHT_BEACON",
        description: "Landing target signaled by light beacon (ex: IR-LOCK)",
        param: {}
      },
      1: {
        name: "RADIO_BEACON",
        description: "Landing target signaled by radio beacon (ex: ILS, NDB)",
        param: {}
      },
      2: {
        name: "VISION_FIDUCIAL",
        description: "Landing target represented by a fiducial marker (ex: ARTag)",
        param: {}
      },
      3: {
        name: "VISION_OTHER",
        description: "Landing target represented by a pre-defined visual shape/feature (ex: X-marker, H-marker, square)",
        param: {}
      }
    },
    VTOL_TRANSITION_HEADING: {
      0: {
        name: "VEHICLE_DEFAULT",
        description: "Respect the heading configuration of the vehicle.",
        param: {}
      },
      1: {
        name: "NEXT_WAYPOINT",
        description: "Use the heading pointing towards the next waypoint.",
        param: {}
      },
      2: {
        name: "TAKEOFF",
        description: "Use the heading on takeoff (while sitting on the ground).",
        param: {}
      },
      3: {
        name: "SPECIFIED",
        description: "Use the specified heading in parameter 4.",
        param: {}
      },
      4: {
        name: "ANY",
        description: "Use the current heading when reaching takeoff altitude (potentially facing the wind when weather-vaning is active).",
        param: {}
      }
    },
    CAMERA_CAP_FLAGS: {
      1: {
        name: "CAPTURE_VIDEO",
        description: "Camera is able to record video.",
        param: {}
      },
      2: {
        name: "CAPTURE_IMAGE",
        description: "Camera is able to capture images.",
        param: {}
      },
      4: {
        name: "HAS_MODES",
        description: "Camera has separate Video and Image/Photo modes (MAV_CMD_SET_CAMERA_MODE)",
        param: {}
      },
      8: {
        name: "CAN_CAPTURE_IMAGE_IN_VIDEO_MODE",
        description: "Camera can capture images while in video mode",
        param: {}
      },
      16: {
        name: "CAN_CAPTURE_VIDEO_IN_IMAGE_MODE",
        description: "Camera can capture videos while in Photo/Image mode",
        param: {}
      },
      32: {
        name: "HAS_IMAGE_SURVEY_MODE",
        description: "Camera has image survey mode (MAV_CMD_SET_CAMERA_MODE)",
        param: {}
      }
    },
    CAMERA_MODE: {
      0: {
        name: "IMAGE",
        description: "Camera is in image/photo capture mode.",
        param: {}
      },
      1: {
        name: "VIDEO",
        description: "Camera is in video capture mode.",
        param: {}
      },
      2: {
        name: "IMAGE_SURVEY",
        description: "Camera is in image survey capture mode. It allows for camera controller to do specific settings for surveys.",
        param: {}
      }
    },
    MAV_ARM_AUTH_DENIED_REASON: {
      0: {
        name: "GENERIC",
        description: "Not a specific reason",
        param: {}
      },
      1: {
        name: "NONE",
        description: "Authorizer will send the error as string to GCS",
        param: {}
      },
      2: {
        name: "INVALID_WAYPOINT",
        description: "At least one waypoint have a invalid value",
        param: {}
      },
      3: {
        name: "TIMEOUT",
        description: "Timeout in the authorizer process(in case it depends on network)",
        param: {}
      },
      4: {
        name: "AIRSPACE_IN_USE",
        description: "Airspace of the mission in use by another vehicle, second result parameter can have the waypoint id that caused it to be denied.",
        param: {}
      },
      5: {
        name: "BAD_WEATHER",
        description: "Weather is not good to fly",
        param: {}
      }
    },
    RC_TYPE: {
      0: {
        name: "SPEKTRUM_DSM2",
        description: "Spektrum DSM2",
        param: {}
      },
      1: {
        name: "SPEKTRUM_DSMX",
        description: "Spektrum DSMX",
        param: {}
      }
    },
    POSITION_TARGET_TYPEMASK: {
      1: {
        name: "X_IGNORE",
        description: "Ignore position x",
        param: {}
      },
      2: {
        name: "Y_IGNORE",
        description: "Ignore position y",
        param: {}
      },
      4: {
        name: "Z_IGNORE",
        description: "Ignore position z",
        param: {}
      },
      8: {
        name: "VX_IGNORE",
        description: "Ignore velocity x",
        param: {}
      },
      16: {
        name: "VY_IGNORE",
        description: "Ignore velocity y",
        param: {}
      },
      32: {
        name: "VZ_IGNORE",
        description: "Ignore velocity z",
        param: {}
      },
      64: {
        name: "AX_IGNORE",
        description: "Ignore acceleration x",
        param: {}
      },
      128: {
        name: "AY_IGNORE",
        description: "Ignore acceleration y",
        param: {}
      },
      256: {
        name: "AZ_IGNORE",
        description: "Ignore acceleration z",
        param: {}
      },
      512: {
        name: "FORCE_SET",
        description: "Use force instead of acceleration",
        param: {}
      },
      1024: {
        name: "YAW_IGNORE",
        description: "Ignore yaw",
        param: {}
      },
      2048: {
        name: "YAW_RATE_IGNORE",
        description: "Ignore yaw rate",
        param: {}
      }
    },
    UAVIONIX_ADSB_OUT_DYNAMIC_STATE: {
      1: {
        name: "INTENT_CHANGE",
        description: "",
        param: {}
      },
      2: {
        name: "AUTOPILOT_ENABLED",
        description: "",
        param: {}
      },
      4: {
        name: "NICBARO_CROSSCHECKED",
        description: "",
        param: {}
      },
      8: {
        name: "ON_GROUND",
        description: "",
        param: {}
      },
      16: {
        name: "IDENT",
        description: "",
        param: {}
      }
    },
    UAVIONIX_ADSB_OUT_RF_SELECT: {
      0: {
        name: "STANDBY",
        description: "",
        param: {}
      },
      1: {
        name: "RX_ENABLED",
        description: "",
        param: {}
      },
      2: {
        name: "TX_ENABLED",
        description: "",
        param: {}
      }
    },
    UAVIONIX_ADSB_OUT_DYNAMIC_GPS_FIX: {
      0: {
        name: "NONE_0",
        description: "",
        param: {}
      },
      1: {
        name: "NONE_1",
        description: "",
        param: {}
      },
      2: {
        name: "2D",
        description: "",
        param: {}
      },
      3: {
        name: "3D",
        description: "",
        param: {}
      },
      4: {
        name: "DGPS",
        description: "",
        param: {}
      },
      5: {
        name: "RTK",
        description: "",
        param: {}
      }
    },
    UAVIONIX_ADSB_RF_HEALTH: {
      0: {
        name: "INITIALIZING",
        description: "",
        param: {}
      },
      1: {
        name: "OK",
        description: "",
        param: {}
      },
      2: {
        name: "FAIL_TX",
        description: "",
        param: {}
      },
      16: {
        name: "FAIL_RX",
        description: "",
        param: {}
      }
    },
    UAVIONIX_ADSB_OUT_CFG_AIRCRAFT_SIZE: {
      0: {
        name: "NO_DATA",
        description: "",
        param: {}
      },
      1: {
        name: "L15M_W23M",
        description: "",
        param: {}
      },
      2: {
        name: "L25M_W28P5M",
        description: "",
        param: {}
      },
      3: {
        name: "L25_34M",
        description: "",
        param: {}
      },
      4: {
        name: "L35_33M",
        description: "",
        param: {}
      },
      5: {
        name: "L35_38M",
        description: "",
        param: {}
      },
      6: {
        name: "L45_39P5M",
        description: "",
        param: {}
      },
      7: {
        name: "L45_45M",
        description: "",
        param: {}
      },
      8: {
        name: "L55_45M",
        description: "",
        param: {}
      },
      9: {
        name: "L55_52M",
        description: "",
        param: {}
      },
      10: {
        name: "L65_59P5M",
        description: "",
        param: {}
      },
      11: {
        name: "L65_67M",
        description: "",
        param: {}
      },
      12: {
        name: "L75_W72P5M",
        description: "",
        param: {}
      },
      13: {
        name: "L75_W80M",
        description: "",
        param: {}
      },
      14: {
        name: "L85_W80M",
        description: "",
        param: {}
      },
      15: {
        name: "L85_W90M",
        description: "",
        param: {}
      }
    },
    UAVIONIX_ADSB_OUT_CFG_GPS_OFFSET_LAT: {
      0: {
        name: "NO_DATA",
        description: "",
        param: {}
      },
      1: {
        name: "LEFT_2M",
        description: "",
        param: {}
      },
      2: {
        name: "LEFT_4M",
        description: "",
        param: {}
      },
      3: {
        name: "LEFT_6M",
        description: "",
        param: {}
      },
      4: {
        name: "RIGHT_0M",
        description: "",
        param: {}
      },
      5: {
        name: "RIGHT_2M",
        description: "",
        param: {}
      },
      6: {
        name: "RIGHT_4M",
        description: "",
        param: {}
      },
      7: {
        name: "RIGHT_6M",
        description: "",
        param: {}
      }
    },
    UAVIONIX_ADSB_OUT_CFG_GPS_OFFSET_LON: {
      0: {
        name: "NO_DATA",
        description: "",
        param: {}
      },
      1: {
        name: "APPLIED_BY_SENSOR",
        description: "",
        param: {}
      }
    },
    UAVIONIX_ADSB_EMERGENCY_STATUS: {
      0: {
        name: "UAVIONIX_ADSB_OUT_NO_EMERGENCY",
        description: "",
        param: {}
      },
      1: {
        name: "UAVIONIX_ADSB_OUT_GENERAL_EMERGENCY",
        description: "",
        param: {}
      },
      2: {
        name: "UAVIONIX_ADSB_OUT_LIFEGUARD_EMERGENCY",
        description: "",
        param: {}
      },
      3: {
        name: "UAVIONIX_ADSB_OUT_MINIMUM_FUEL_EMERGENCY",
        description: "",
        param: {}
      },
      4: {
        name: "UAVIONIX_ADSB_OUT_NO_COMM_EMERGENCY",
        description: "",
        param: {}
      },
      5: {
        name: "UAVIONIX_ADSB_OUT_UNLAWFUL_INTERFERANCE_EMERGENCY",
        description: "",
        param: {}
      },
      6: {
        name: "UAVIONIX_ADSB_OUT_DOWNED_AIRCRAFT_EMERGENCY",
        description: "",
        param: {}
      },
      7: {
        name: "UAVIONIX_ADSB_OUT_RESERVED",
        description: "",
        param: {}
      }
    },
    ICAROUS_TRACK_BAND_TYPES: {
      0: {
        name: "ICAROUS_TRACK_BAND_TYPE_NONE",
        description: "",
        param: {}
      },
      1: {
        name: "ICAROUS_TRACK_BAND_TYPE_NEAR",
        description: "",
        param: {}
      },
      2: {
        name: "ICAROUS_TRACK_BAND_TYPE_RECOVERY",
        description: "",
        param: {}
      }
    },
    ICAROUS_FMS_STATE: {
      0: {
        name: "IDLE",
        description: "",
        param: {}
      },
      1: {
        name: "TAKEOFF",
        description: "",
        param: {}
      },
      2: {
        name: "CLIMB",
        description: "",
        param: {}
      },
      3: {
        name: "CRUISE",
        description: "",
        param: {}
      },
      4: {
        name: "APPROACH",
        description: "",
        param: {}
      },
      5: {
        name: "LAND",
        description: "",
        param: {}
      }
    }
  }
  // Return command text if available
  if (enumGroup in mavlinkEnums) {
    if (enumValue in mavlinkEnums[enumGroup]) {
      return mavlinkEnums[enumGroup][enumValue].name
    }
  } else {
    return enumValue
  }
}
