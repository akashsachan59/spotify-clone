import { signIn, useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import spotifyApi from "../lib/spotify";

function useSpotify() {
    const {data: session} = useSession()

    useEffect(() => {
        if(session){
            // if refresh access token attempt fails, direct user to login.
            if(session.error === "RefreshAccessTokenError"){
                signIn()
            }

            spotifyApi.setAccessToken(session.user.accessToken)
        }
    },[session])

    return spotifyApi
}

export default useSpotify
