export type paystackResponse = {
    message: string;
    status: boolean;
    data: {
        authorization_url: string;

        access_code: string;
        reference: string;
    };
};

export type flutterWaveResponse = {
    data: {
        success: "success" | "failed";
        message: string;
        data: {
            link: string;
        };
    };
};
