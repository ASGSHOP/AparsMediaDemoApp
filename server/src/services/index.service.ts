import HttpException from '../exceptions/HttpException';
import { CreateMeetingRequest, Meeting } from 'interfaces/meeting.interface';

import { postRestCall, getRestCall } from '../utils/restCall.util';

class IndexService {
  private apiUrl = process.env.AM_API_URL;

  public createMeeting = async (reqBody: Meeting) => {
    const tmApiRequest: any = {
      name: reqBody.name,
      description: reqBody.description,
      hostId: reqBody.hostId,
      hostName: reqBody.hostName,
      scheduledAt: reqBody.scheduledAt,
      duration: reqBody.duration,
      maxParticipants: reqBody.maxParticipants,
      features: {
        chat: reqBody.chat,
        recording: reqBody.recording,
      },
    };
    const createdMeeting = await postRestCall(
      `${this.apiUrl}/api/rooms`,
      tmApiRequest
    );

    return createdMeeting;
  };

  public joinMeeting = async (reqBody: any) => {
    const tmApiRequest: any = {
      userId: reqBody.userId,
      userName: reqBody.userName,
      role: reqBody.role,
    };
    const joinedMeetingRes = await postRestCall(
      `${this.apiUrl}/api/rooms/${reqBody.roomId}/join`,
      tmApiRequest
    );

    if (joinedMeetingRes.success == false) {
      throw new HttpException(500, joinedMeetingRes.msg);
    }

    return joinedMeetingRes.data;
  };

  public endMeeting = async (reqBody: any) => {
    const endMeetingRes = await postRestCall(
      `${this.apiUrl}/api/rooms/${reqBody.roomId}/end`,
      {}
    );

    if (endMeetingRes.success == false) {
      throw new HttpException(500, endMeetingRes.msg);
    }

    return endMeetingRes.success;
  };
}

export default IndexService;
