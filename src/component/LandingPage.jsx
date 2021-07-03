import React from "react";
import {
    Link,
} from "react-router-dom";
import { Button } from "./ui/Button";
import NavBar from "./ui/NavBar";
import { Text } from "./ui/Text";
import { Link as Link1 } from "./ui/Link";

export default function LandingPage() {
    return (
        <>
            <NavBar>
                <Link1.Regular className={["mr-4 font-semibold"]} to="/login">Log In</Link1.Regular>
                <Link to="/sign-up">
                    <Button>Sign Up</Button>
                </Link>
            </NavBar>
            <div className="flex justify-center">

                <div className="text-left max-w-2xl py-14">
                    <Text.H1 className={["font-bold"]}>
                        <span className="text-6xl text-gray-700 block">Todo List,</span>
                        <span>Reimagined</span>
                    </Text.H1>
                    <p className="py-3 text-2xl">
                        Todolist lets you quickly add and organize tasks,
                        including recurring tasks and mark as done when you completed
                    </p>
                    <Button isLarge>
                        Demo
                    </Button>
                </div>
            </div>
        </>
    );
}
