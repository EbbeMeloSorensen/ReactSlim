import React, { Fragment } from "react";
import { Button, Grid, Header } from "semantic-ui-react";

export default function Playground() {
    return (
        <Fragment>
            <Header as='h1'>
                Playground
            </Header>
            <Grid>
                <Grid.Row height='4'>
                    <Button>
                        Aske
                    </Button>
                </Grid.Row>
                <Grid.Row height='2'>
                    <Button>
                        Luna
                    </Button>
                </Grid.Row>
                <Grid.Column width='10'>
                    <Button>
                        Bamse
                    </Button>
                </Grid.Column>
                <Grid.Column width='5'>
                    <Button>
                        Kylling
                    </Button>
                </Grid.Column>
                <Button>
                    Arthur
                </Button>
            </Grid>
        </Fragment>
    )
}
