export interface pollResponse {
    userId: string,
    question: string,
    pollType: string,
    options: string[],
}

export interface PollOption {
    _id: string;
    text: string;
    votes: number;
  }
  
  export interface Poll {
    _id: string;
    question: string;
    pollType: 'multiple' | 'yesno';
    options: PollOption[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
